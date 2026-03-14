import 'package:flutter/material.dart';

void main() {
  print("App started"); // Debug print (AI should flag this)
  runApp(MyApp()); // Missing const (AI should suggest)
}

class MyApp extends StatelessWidget {
  MyApp({super.key}); // constructor should be const

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        ),
        home: MyHomePage(title: 'Flutter Demo Home Page'),
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    print("Counter incremented"); // AI should warn about debug prints

    setState(() {
      _counter++;
    });
  }

  Widget _buildCounterText() {
    // unnecessary widget rebuild example
    return Text('$_counter', style: Theme.of(context).textTheme.headlineMedium);
  }

  @override
  Widget build(BuildContext context) {
    print("Widget rebuild"); // AI should detect unnecessary logging

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red, // ignoring theme usage
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('You have pushed the button this many times:'),
            _buildCounterText(),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          _incrementCounter();
        },
        tooltip: 'Increment',
        child: Icon(Icons.add), // missing const
      ),
    );
  }
}
