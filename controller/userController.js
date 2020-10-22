const express = require('express');
const createUser = require('../service/userService');

const insertUser = async (req, res) => {
  try {
    // const { displayName, email, password, image } = req.body;
    const token = await createUser(req.body);
  }
}
