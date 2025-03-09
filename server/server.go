// Copyright 2015 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

//go:build ignore
// +build ignore

package main

import (
	"encoding/binary"
	"flag"
	"log"
	"math"
	"net/http"
	"strings"

	"github.com/gorilla/websocket"
)

var addr = flag.String("addr", "localhost:8080", "http service address")

var upgrader = websocket.Upgrader{} // use default options

type Tank struct {
	x   float64
	y   float64
	z   float64
	dir float64
}

var clients [](*websocket.Conn)
var c_map map[*websocket.Conn]*Tank

func f64_bytes(bytes []byte) float64 {
	bits := binary.LittleEndian.Uint64(bytes)
	float := math.Float64frombits(bits)
	return float
}

func join(w http.ResponseWriter, r *http.Request) {

	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}

	clients = append(clients, c)
	mt, message, err := c.ReadMessage()
	if err != nil {
		log.Println("read:", err)
	}

	var x_bytes = message[0:8]
	var y_bytes = message[8:16]
	var z_bytes = message[16:24]

	c_map[c] = &Tank{
		x: f64_bytes(x_bytes),
		y: f64_bytes(y_bytes),
		z: f64_bytes(z_bytes),
	}
	// Deal with concurrent map
	log.Printf("New Tank. X:%.2f, Y:%.2f, Z:%.2f", c_map[c].x, c_map[c].y, c_map[c].z)
	// for {
	// 	mt, message, err := c.ReadMessage()
	// 	if err != nil {
	// 		log.Println("read:", err)
	// 		break
	// 	}
	// 	log.Printf("recv: %s", message)

	// 	testing := []byte(fmt.Sprintf("Num: %d", funny))
	// 	funny++
	// 	err = c.WriteMessage(mt, testing)
	// 	if err != nil {
	// 		log.Println("write:", err)
	// 		break
	// 	}
	// }
}

func play(c *websocket.Conn) {
	for {

	}
}

func main() {
	c_map = make(map[*websocket.Conn]*Tank)

	upgrader.CheckOrigin = func(r *http.Request) bool {
		print("Host: " + r.Host + "\n")
		if strings.HasPrefix(r.Host, "localhost") {
			return true
		}
		return false
	}

	flag.Parse()
	log.SetFlags(0)
	http.HandleFunc("/join", join)
	log.Fatal(http.ListenAndServe(*addr, nil))
}
