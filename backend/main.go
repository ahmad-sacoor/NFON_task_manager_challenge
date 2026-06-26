package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"sync"
)

type Task struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	IsCompleted bool   `json:"is_completed"`
}

type CreateTaskRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

var (
	tasks  []Task
	nextID int = 1
	mu     sync.Mutex
)

func main() {
	tasks = []Task{
		{ID: nextID, Title: "Welcome Task", Description: "This is a sample task to get you started", IsCompleted: false},
	}
	nextID++

	http.HandleFunc("/api/tasks", handleTasks)
	http.HandleFunc("/api/tasks/", handleTaskAction)

	// Serve static files from frontend build directory
	fs := http.FileServer(http.Dir("../frontend/build"))
	http.Handle("/", fs)

	fmt.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func enableCORS(w http.ResponseWriter, r *http.Request) bool {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return true
	}
	return false
}

func handleTasks(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}

	switch r.Method {
	case "GET":
		getTasks(w, r)
	case "POST":
		createTask(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func handleTaskAction(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}

	path := strings.TrimPrefix(r.URL.Path, "/api/tasks/")
	parts := strings.Split(path, "/")

	if len(parts) == 0 {
		http.Error(w, "Invalid path", http.StatusBadRequest)
		return
	}

	id, err := strconv.Atoi(parts[0])
	if err != nil {
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	if len(parts) == 2 && parts[1] == "complete" && r.Method == "PUT" {
		completeTask(w, r, id)
		return
	}

	if len(parts) == 1 && r.Method == "DELETE" {
		deleteTask(w, r, id)
		return
	}

	http.Error(w, "Not found", http.StatusNotFound)
}

func getTasks(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func createTask(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	var req CreateTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Title == "" {
		http.Error(w, "Title is required", http.StatusBadRequest)
		return
	}

	task := Task{
		ID:          nextID,
		Title:       req.Title,
		Description: req.Description,
		IsCompleted: false,
	}
	nextID++
	tasks = append(tasks, task)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(task)
}

func completeTask(w http.ResponseWriter, r *http.Request, id int) {
	mu.Lock()
	defer mu.Unlock()

	for i := range tasks {
		if tasks[i].ID == id {
			tasks[i].IsCompleted = true
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(tasks[i])
			return
		}
	}

	http.Error(w, "Task not found", http.StatusNotFound)
}

func deleteTask(w http.ResponseWriter, r *http.Request, id int) {
	mu.Lock()
	defer mu.Unlock()

	for i := range tasks {
		if tasks[i].ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}

	http.Error(w, "Task not found", http.StatusNotFound)
}
