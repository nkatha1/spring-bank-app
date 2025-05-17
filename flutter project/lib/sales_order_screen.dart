import 'package:flutter/material.dart';

class SalesOrderScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sales Order'),
      ),
      body: Center(
        child: Text('This is the Sales Order screen.'),
      ),
    );
  }
}