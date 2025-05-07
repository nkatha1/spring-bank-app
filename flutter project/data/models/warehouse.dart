class Warehouse {
  final String id;
  final String name;
  final String city;
  final String region;
  final int storageCapacityUnits;
  final int utilizedPercentage;

  Warehouse({
    required this.id,
    required this.name,
    required this.city,
    required this.region,
    required this.storageCapacityUnits,
    required this.utilizedPercentage,
  });

  factory Warehouse.fromJson(Map<String, dynamic> json) {
    return Warehouse(
      id: json['id'],
      name: json['name'],
      city: json['address']['city'],
      region: json['address']['region'],
      storageCapacityUnits: json['capacity']['storage_capacity_units'],
      utilizedPercentage: json['capacity']['utilized_percentage'],
    );
  }
}