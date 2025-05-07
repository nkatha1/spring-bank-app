// presentation/order_confirmation_page.dart
import 'package:flutter/material.dart';

class OrderConfirmationPage extends StatelessWidget {
  final String orderId;

  OrderConfirmationPage({required this.orderId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Order Confirmation")),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Your order has been placed successfully!', style: Theme.of(context).textTheme.headline5),
            SizedBox(height: 20),
            Text('Order ID: $orderId', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            SizedBox(height: 20),
            Text('Thank you for your purchase! Your order will be processed and shipped shortly.'),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/home'); // Navigate back to home or any other page
              },
              child: Text('Back to Home'),
            ),
          ],
        ),
      ),
    );
  }
}