#!/bin/bash

PID_4444=$(lsof -t -i :4444)
if [ -n "$PID_4444" ]; then
    kill -9 "$PID_4444"
    echo "Killed process on port 4444 (PID: $PID_4444)"
else
    echo "No process found on port 4444"
fi

PID_4567=$(lsof -t -i :4567)
if [ -n "$PID_4567" ]; then
    kill -9 "$PID_4567"
    echo "Killed process on port 4567 (PID: $PID_4567)"
else
    echo "No process found on port 4567"
fi
