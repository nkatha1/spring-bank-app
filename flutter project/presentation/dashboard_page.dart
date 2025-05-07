import 'package:flutter/material.dart';

class DashboardPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Dashboard"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Welcome to the Leysco Sales App!",
              style: TextStyle(fontSize: 24),
            ),
            SizedBox(height: 20),
            Card(
              child: ListTile(
                title: Text("Sales Summary"),
                subtitle: Text("Tota