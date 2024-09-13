#!/bin/bash

PID_4444=$(lsof -t -i :4444)
if [ -n "$PID_4444" ]; then
    kill -9 "$PID_4444"
    echo "Killed process on port 4444 (PID: $PID_4444)"
else
    echo "No process found on port 4444"
fi

PID_4200=$(lsof -t -i :4200)
if [ -n "$PID_4200" ]; then
    kill -9 "$PID_4200"
    echo "Killed process on port 4200 (PID: $PID_4200)"
else
    echo "No process found on port 4200"
fi
