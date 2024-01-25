package main

import (
	"os"

	"github.com/joho/godotenv"
)

func GetEnv() Env {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	return Env{
		Listen: os.Getenv("LISTEN"),
	}
}
