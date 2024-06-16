#!/bin/bash

BASE_URL="http://localhost:3000/api/tasks/single"

current_time=$(date +%s)

create_task() {
  time=$1
  task=$2

  iso_time=$(date -u --date="@${time}" +"%Y-%m-%dT%H:%M:%SZ")

  payload=$(jq -n --arg time "$iso_time" --arg task "$task" '{time: $time, task: $task}')

  curl -X POST -H "Content-Type: application/json" -d "$payload" "$BASE_URL"
}

# Create tasks for the next minute
for i in {1..10}; do
  task_time=$((current_time + i * 6))  # Every 6 seconds in the next minute
  create_task $task_time "Task $i"
  echo "Created task $i for time $task_time"
done
