const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const app = express ();
const PORT = process.env.PORT || 3000;
const db = require("./db/db.json");

let note = [];