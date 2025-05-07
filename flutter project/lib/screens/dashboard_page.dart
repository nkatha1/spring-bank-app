import 'package:flutter/material.dart';

class DashboardPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Dashboard'), // Title of the dashboard page
        backgroundColor: Colors.blue,
      ),
      body: SingleChildScrollView( // This allows the dashboard content to scroll if it's too long
        child: Padding(
          padding: EdgeInsets.all(20.0),
          child: Column(
            children: [
              // Section for Sales Summary
              Card(
                elevation: 5, // Card shadow for better UI
                child: ListTile(
                  title: Text('Sales Summary'),
                  subtitle: Text('Total Sales: \$1,250,000'), // Example sales data
                  leading: Icon(Icons.bar_chart),
                  onTap: () {
                    // Navigate to Sales Details when tapped
                    // You can add a detailed page later
                  },
                ),
              ),

              SizedBox(height: 20),

              // Section for Inventory Alerts
              Card(
                elevation: 5,
                child: ListTile(
                  title: Text('Inventory Alerts'),
                  subtitle: Text('Low stock for some items'),
                  leading: Icon(Icons.inventory),
                  onTap: () {
                    // Navigate to Inventory page (you can add later)
                  },
                ),
              ),

              SizedBox(height: 20),

              // Section for Customer Overview
              Card(
                elevation: 5,
                child: ListTile(
                  title: Text('Top Customers'),
                  subtitle: Text('Top 5 customers list'),
                  leading: Icon(Icons.person),
                  onTap: () {
                    // Navigate to the Customer List page
                    Navigator.pushNamed(context, '/customers');
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}