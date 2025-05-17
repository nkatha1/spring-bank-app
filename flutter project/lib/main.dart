import 'package:flutter/material.dart';
import 'screens/login_page.dart';
import 'screens/dashboard_page.dart';
import 'screens/customer_list_page.dart';
import 'sales_order_screen.dart'; // ✅ Import the Sales Order screen

void main() {
  runApp(LeyscoApp());
}

class LeyscoApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Leysco Sales App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => LoginPage(),
        '/dashboard': (context) => DashboardPage(),
        '/customers': (context) => CustomerListPage(),
        '/sales_orders': (context) => SalesOrderScreen(), // ✅ route added
        // Add more routes here as new screens are implemented
      },
    );
  }
}