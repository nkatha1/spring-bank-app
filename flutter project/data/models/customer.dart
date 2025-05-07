class Customer {
  final String id;
  final String name;
  final String type;
  final String contactPerson;
  final String phone;

  Customer({
    required this.id,
    required this.name,
    required this.type,
    required this.contactPerson,
    required this.phone,
  });

  factory Customer.fromJson(Map<String, dynamic> json) {
    return Customer(
      id: json['id'],
      name: json['name'],
      type: json['type'],
      contactPerson: json['contact_person'],
      phone: json['phone'],
    );
  }
}