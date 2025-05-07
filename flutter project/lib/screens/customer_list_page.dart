import 'package:flutter/material.dart';

class CustomerListPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Sample data for customers (can be replaced with actual data later)
    List<Map<String, String>> customers = [
      {'name': 'Quick Auto Services Ltd', 'contact': 'John Mwangi', 'location': 'Nairobi'},
      {'name': 'Premium Motors Kenya', 'contact': 'Sarah Wanjiku', 'location': 'Nairobi'},
    ];

    return Scaffold(
      appBar: AppBar(
        title: Text('Customer List'), // Title of the customer list page
        backgroundColor: Colors.blue,
      ),
      body: Padding(
        padding: EdgeInsets.all(20.0),
        child: ListView.builder(
          itemCount: customers.length,
          itemBuilder: (context, index) {
            return Card(
              elevation: 5,
              child: ListTile(
                title: Text(customers[index]['name']!),
                subtitle: Text('Contact: ${customers[index]['contact']} \nLocation: ${customers[index]['location']}'),
                leading: Icon(Icons.business),
                onTap: () {
                  // Add navigation to Customer Details page in future
                },
              ),
            );
          },
        ),
      ),
    );
  }
}