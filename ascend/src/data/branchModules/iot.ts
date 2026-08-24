import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

export const IOT_MODULES: BranchModuleData[] = [
  {
    moduleTitle: "IoT Architecture and Protocols",
    level: "Foundation",
    branch: ["iot"],
    videos: makeVideoLinks("IoT Internet of Things Architecture MQTT"),
    studyMaterial: {
      summary: "IoT (Internet of Things) connects physical devices to the internet for data collection, monitoring, and control. The 4-layer architecture: Perception (sensors/actuators), Network (connectivity), Processing (edge/cloud), Application (dashboard/AI). Key protocols: MQTT, CoAP, HTTP, AMQP.",
      keyPoints: [
        "IoT 4-layer model: Perception, Network, Processing, Application layers",
        "MQTT: lightweight pub-sub protocol for constrained devices, port 1883/8883 (TLS), QoS 0/1/2",
        "CoAP: Constrained Application Protocol — REST for IoT, UDP-based, low overhead",
        "HTTP/REST: standard web protocol — higher overhead, good for non-constrained devices",
        "AMQP: Advanced Message Queuing Protocol — enterprise messaging with routing and transactions",
        "Edge computing processes data locally reducing latency and bandwidth to cloud",
        "Fog computing: intermediate layer between edge devices and cloud",
        "Device twins/shadows: virtual representation of physical device state in cloud (AWS IoT, Azure)",
        "OTA (Over-The-Air) updates: remotely update firmware without physical access",
        "IPv6/6LoWPAN: compressed IPv6 for low-power wireless IoT networks"
      ],
      example: "MQTT publish: temperature sensor publishes to topic 'home/bedroom/temperature' with payload '23.5' at QoS 1 (guaranteed delivery). Broker (Mosquitto) forwards to all subscribers.",
      complexity: "MQTT overhead: 2 bytes fixed header vs HTTP: 200+ bytes headers — 100x more efficient for constrained networks"
    },
    aiExplain: {
      steps: [
        "IoT is like giving every physical object a brain and voice to communicate over the internet",
        "MQTT is like a postal system — devices publish messages to a topic, broker delivers to subscribers",
        "Edge computing is like doing your homework locally instead of sending it to a distant server",
        "Device twins keep a cloud copy of device state so you can query it even when device is offline"
      ],
      analogy: "IoT architecture is like a nervous system: sensors are sensory organs (perception), networks are nerves (communication), edge/cloud are the brain (processing), and apps are the actions taken (application)."
    },
    debug: [
      {
        title: "Fix MQTT connection with QoS",
        buggy: "client.publish('sensor/temp', '23.5')  # QoS 0 — fire and forget, may lose data!",
        fixed: "client.publish('sensor/temp', '23.5', qos=1)  # QoS 1 — at least once delivery guaranteed\n# Use qos=2 for critical data: exactly once delivery",
        hint: "QoS 0 = fire and forget. QoS 1 = at least once (may duplicate). QoS 2 = exactly once. Choose based on data criticality."
      }
    ],
    quiz: [
      { q: "MQTT default port?", options: ["80", "443", "1883", "8080"], answer: 2 },
      { q: "CoAP uses which transport protocol?", options: ["TCP", "UDP", "HTTP", "MQTT"], answer: 1 },
      { q: "Edge computing advantage?", options: ["More storage", "Reduced latency and bandwidth", "Higher cost", "Cloud dependency"], answer: 1 },
      { q: "MQTT QoS 2 means?", options: ["Fire and forget", "At least once", "Exactly once", "No guarantee"], answer: 2 },
      { q: "Device shadow/twin purpose?", options: ["Backup power", "Virtual device state in cloud", "Physical replica", "Debug mode"], answer: 1 }
    ],
    mnc: [
      { company: "Bosch", year: "2024", question: "Compare MQTT vs HTTP for IoT sensor data transmission.", answer: "MQTT: 2-byte header, pub-sub model, persistent connections, QoS guarantees, ideal for constrained devices and unreliable networks. HTTP: 200+ byte headers, request-response, stateless — better for one-time commands and when REST API compatibility needed." }
    ],
    mock: [
      { type: "Technical", question: "Design IoT architecture for a smart factory with 10000 sensors.", tip: "Use MQTT with Mosquitto broker at edge, aggregate data with Kafka, process with Spark Streaming, store in InfluxDB time-series DB, visualize with Grafana. Add OTA updates and device management via AWS IoT or Azure IoT Hub." }
    ],
    coding: {
      problem: "MQTT Message Parser",
      desc: "Parse MQTT topic path and extract device ID and sensor type from structured topic.",
      input: "topic='factory/line1/device_007/temperature', payload='72.3'",
      output: "{'location': 'factory/line1', 'device': 'device_007', 'sensor': 'temperature', 'value': 72.3}",
      starter: "def parse_mqtt_message(topic: str, payload: str) -> dict:\n    parts = topic.split('/')\n    return {\n        'location': '/'.join(parts[:-2]),\n        'device': parts[-2],\n        'sensor': parts[-1],\n        'value': float(payload)\n    }"
    }
  },
  {
    moduleTitle: "Embedded Systems and Microcontrollers",
    level: "Foundation",
    branch: ["iot"],
    videos: makeVideoLinks("Arduino Raspberry Pi ESP32 embedded systems microcontroller"),
    studyMaterial: {
      summary: "Embedded systems are dedicated computers for specific tasks within larger systems. Common IoT platforms: Arduino (AVR/ARM), ESP32 (dual-core, WiFi+BT built-in), Raspberry Pi (Linux SBC), STM32 (ARM Cortex-M). Key concepts: GPIO, ADC/DAC, I2C, SPI, UART communication.",
      keyPoints: [
        "GPIO (General Purpose Input/Output): configurable digital pins for reading sensors and controlling actuators",
        "ADC (Analog-to-Digital Converter): converts analog sensor voltage to digital value — 12-bit ESP32 gives 0-4095",
        "I2C: 2-wire serial protocol (SDA + SCL), supports multiple devices, up to 400kHz — ideal for sensors",
        "SPI: 4-wire protocol (MOSI, MISO, SCK, CS), faster than I2C, full-duplex — used for displays and SD cards",
        "UART: Universal Asynchronous Receiver-Transmitter — serial debugging and GPS communication",
        "PWM (Pulse Width Modulation): controls LED brightness and motor speed using duty cycle",
        "Interrupts: hardware events that pause main program — use for button press, timer, UART receive",
        "Watchdog timer: resets MCU if firmware hangs — essential for production reliability",
        "ESP32: dual-core Xtensa LX6, 240MHz, 520KB SRAM, WiFi+BT+BLE, 18 ADC channels, deep sleep 10uA",
        "RTOS (Real-Time Operating System): FreeRTOS on ESP32 enables multitasking with task priorities"
      ],
      example: "ESP32 reading DHT22: pin 4 digital, read temperature (25.3C) and humidity (65.2%). Convert to JSON: {temp:25.3, hum:65.2, ts:1724000000}. Publish to MQTT every 30 seconds.",
    },
    aiExplain: {
      steps: [
        "Microcontrollers are tiny computers with built-in pins to talk directly to the physical world",
        "GPIO pins are like hands — they can sense inputs (buttons, sensors) or control outputs (LEDs, motors)",
        "I2C is like a shared bus where multiple devices take turns talking using their unique address",
        "RTOS lets the ESP32 handle WiFi, sensors, and display simultaneously without one blocking others"
      ],
      analogy: "A microcontroller is like a tiny brain with arms (GPIO) — it senses the environment through sensors, thinks about what to do, and controls actuators to interact with the physical world."
    },
    debug: [
      {
        title: "Fix I2C sensor initialization",
        buggy: "Wire.begin();  // Missing SDA and SCL pins for ESP32!\nsensor.begin();  // Will fail — wrong pins",
        fixed: "Wire.begin(21, 22);  // ESP32: SDA=GPIO21, SCL=GPIO22\nif (!sensor.begin()) {\n    Serial.println('Sensor not found!');\n    while(1);  // Halt if sensor missing\n}",
        hint: "ESP32 requires explicit SDA/SCL pin specification in Wire.begin(). Default Arduino pins differ from ESP32."
      }
    ],
    quiz: [
      { q: "ESP32 ADC resolution?", options: ["8-bit", "10-bit", "12-bit", "16-bit"], answer: 2 },
      { q: "I2C uses how many wires?", options: ["1", "2", "4", "8"], answer: 1 },
      { q: "PWM controls?", options: ["Analog voltage directly", "Duty cycle for power control", "Digital logic only", "Current measurement"], answer: 1 },
      { q: "Watchdog timer purpose?", options: ["Measure time", "Reset MCU on firmware hang", "Clock synchronization", "Power management"], answer: 1 },
      { q: "SPI advantage over I2C?", options: ["Fewer wires", "Higher speed, full-duplex", "More devices supported", "Longer distance"], answer: 1 }
    ],
    mnc: [
      { company: "Siemens", year: "2024", question: "Explain how you would read temperature from multiple I2C sensors on one bus.", answer: "Each I2C sensor needs unique address. Use TCA9548A multiplexer if addresses conflict. Wire all sensors to same SDA/SCL lines. Poll each by address in loop. Add error handling for sensor absence. Use FreeRTOS task for non-blocking reads." }
    ],
    mock: [
      { type: "Technical", question: "Design a battery-powered IoT sensor node lasting 1 year on AA batteries.", tip: "Deep sleep mode between readings (ESP32: 10uA). Read sensor every 15 minutes. WiFi only for transmission (3 seconds). Use MQTT with QoS 1. Optimize code to minimize active time. Calculate: 2 x AA = 3000mAh, ~4uA average = 730 days." }
    ],
    coding: {
      problem: "Sensor Data Aggregator",
      desc: "Aggregate multiple sensor readings and compute min, max, average for time window.",
      input: "readings=[23.1, 23.5, 22.8, 24.1, 23.9, 22.5], window=5",
      output: "{'min': 22.8, 'max': 24.1, 'avg': 23.48, 'count': 5}",
      starter: "def aggregate_sensors(readings: list, window: int) -> dict:\n    window_data = readings[-window:]\n    return {\n        'min': round(min(window_data), 2),\n        'max': round(max(window_data), 2),\n        'avg': round(sum(window_data)/len(window_data), 2),\n        'count': len(window_data)\n    }"
    }
  },
  {
    moduleTitle: "IoT Security and Edge AI",
    level: "Advanced",
    branch: ["iot"],
    videos: makeVideoLinks("IoT Security Edge AI TensorFlow Lite embedded machine learning"),
    studyMaterial: {
      summary: "IoT security is critical as devices control physical systems. Key threats: default credentials, unencrypted communications, firmware vulnerabilities, physical tampering. Edge AI (TinyML) runs ML models directly on microcontrollers using TensorFlow Lite for Microcontrollers or Edge Impulse.",
      keyPoints: [
        "TLS 1.3 mandatory for all IoT communications — never transmit sensor data over plain HTTP/MQTT",
        "Certificate-based authentication: X.509 certificates for device identity (AWS IoT, Azure IoT Hub)",
        "Firmware signing: cryptographic signature verification prevents malicious firmware updates",
        "Secure boot: MCU verifies firmware integrity at startup before executing",
        "OWASP IoT Top 10: Weak passwords, insecure network services, insecure ecosystem interfaces",
        "Network segmentation: isolate IoT devices on separate VLAN from corporate network",
        "TensorFlow Lite: optimized ML framework for MCUs — runs on 256KB RAM",
        "Edge Impulse: no-code platform for training and deploying TinyML models",
        "Anomaly detection on edge: detect abnormal sensor patterns without cloud connectivity",
        "Differential privacy and federated learning for privacy-preserving IoT analytics"
      ],
      example: "TinyML keyword detection on Arduino Nano 33 BLE Sense: 16kHz audio, 50ms inference, 96% accuracy for 10 keywords using quantized model occupying only 20KB Flash.",
    },
    aiExplain: {
      steps: [
        "IoT security is like locking every door and window in a smart house — one weak point exposes everything",
        "TLS encrypts data in transit — like sending messages in a sealed envelope rather than a postcard",
        "Firmware signing is like a sealed certificate proving the update is from the real manufacturer",
        "Edge AI is like teaching the sensor itself to recognize patterns instead of sending all data to the cloud"
      ],
      analogy: "IoT security is like protecting a city (network) full of smart buildings (devices) — each building needs locked doors (authentication), encrypted communications (TLS), and verified residents (firmware signing)."
    },
    debug: [
      {
        title: "Fix insecure MQTT connection",
        buggy: "client.connect('mqtt.example.com', 1883)  # Plain text! Credentials exposed!",
        fixed: "client.tls_set(ca_certs='ca.crt', certfile='device.crt', keyfile='device.key')\nclient.tls_insecure_set(False)\nclient.connect('mqtt.example.com', 8883)  # Port 8883 = MQTT over TLS",
        hint: "Always use TLS (port 8883) for MQTT. Load device certificate for mutual TLS authentication."
      }
    ],
    quiz: [
      { q: "MQTT over TLS uses port?", options: ["1883", "443", "8883", "8080"], answer: 2 },
      { q: "TinyML primary advantage?", options: ["Higher accuracy", "Inference on device without cloud", "Faster training", "More data storage"], answer: 1 },
      { q: "Secure boot does?", options: ["Encrypts flash memory", "Verifies firmware before execution", "Prevents OTA updates", "Monitors power consumption"], answer: 1 },
      { q: "OWASP IoT Top 10 first risk?", options: ["Insecure updates", "Weak passwords", "Physical attacks", "Privacy issues"], answer: 1 }
    ],
    mnc: [
      { company: "Honeywell", year: "2024", question: "How would you secure a fleet of 100000 IoT sensors deployed globally?", answer: "X.509 certificates per device provisioned at manufacturing. TLS 1.3 for all communications. Signed firmware OTA via secure channel. Device shadow for state management. Network segmentation. SIEM for anomaly detection. Regular vulnerability assessments. Automated certificate rotation." }
    ],
    mock: [
      { type: "Technical", question: "Explain how you would deploy a TinyML model for vibration anomaly detection on a factory motor.", tip: "Collect accelerometer data at 1kHz, extract features (FFT, RMS, peak), train classifier on Edge Impulse with normal vs faulty vibration patterns, quantize to INT8, deploy to Arduino Nano. Trigger alert when anomaly score exceeds threshold. Retrain monthly with new data." }
    ],
    coding: {
      problem: "Anomaly Detection for Sensor Data",
      desc: "Detect anomalous readings using z-score method. Return list of indices where readings are anomalous.",
      input: "readings=[23.1, 23.5, 22.8, 45.2, 23.9, 22.5, 24.1], threshold=2.5",
      output: "Anomalies at indices: [3] — value 45.2 is 5.2 std devs from mean",
      starter: "import statistics\ndef detect_anomalies(readings: list, threshold: float) -> list:\n    mean = statistics.mean(readings)\n    std = statistics.stdev(readings)\n    return [i for i, v in enumerate(readings) if abs(v - mean) / std > threshold]"
    }
  },
  {
    moduleTitle: "Cloud IoT Platforms and Data Pipelines",
    level: "Advanced",
    branch: ["iot"],
    videos: makeVideoLinks("AWS IoT Azure IoT Hub Cloud Platform time series database"),
    studyMaterial: {
      summary: "Cloud IoT platforms manage millions of devices, ingest billions of messages, and enable analytics at scale. Major platforms: AWS IoT Core, Azure IoT Hub, Google Cloud IoT. Time-series databases (InfluxDB, TimescaleDB) store sensor data. Stream processing (Kafka, Flink) enables real-time analytics.",
      keyPoints: [
        "AWS IoT Core: managed MQTT broker, device registry, rules engine to route messages to AWS services",
        "Azure IoT Hub: device-to-cloud and cloud-to-device messaging, device twins, direct methods",
        "Device provisioning service (DPS): auto-provision devices at scale using X.509 or TPM attestation",
        "IoT Rules Engine: SQL-like queries on MQTT messages to trigger Lambda, DynamoDB, S3, SNS",
        "InfluxDB: purpose-built time-series database — optimized for high-write, time-ordered sensor data",
        "Grafana: open-source visualization tool — connects to InfluxDB, Prometheus, AWS CloudWatch",
        "Kafka: distributed streaming platform for high-throughput IoT data ingestion (millions msg/sec)",
        "Lambda architecture: batch layer (S3+Glue) + speed layer (Kinesis+Lambda) + serving layer",
        "Digital twin: real-time virtual replica of physical asset — enables predictive maintenance",
        "Predictive maintenance ML: anomaly detection on equipment sensor data to predict failure"
      ],
      example: "Smart factory pipeline: ESP32 sensors publish via MQTT to AWS IoT Core. Rules Engine routes to Kinesis Data Streams. Lambda processes and writes to InfluxDB. Grafana dashboard shows real-time OEE metrics. SageMaker model flags predictive maintenance alerts.",
    },
    aiExplain: {
      steps: [
        "Cloud IoT platforms are like intelligent post offices that receive billions of device messages and route them correctly",
        "Device twins are like a cloud mirror — reflecting the current state of your physical device",
        "InfluxDB stores time-series data like a diary — every measurement stamped with when it happened",
        "Digital twins simulate the physical asset in software — predict problems before they occur"
      ],
      analogy: "Cloud IoT is like running a global air traffic control system — millions of devices (planes) constantly sending data (position), the platform routes it correctly, and analytics prevent collisions (failures)."
    },
    debug: [
      {
        title: "Fix IoT Rule to route temperature alerts",
        buggy: "-- SQL Rule (wrong operator)\nSELECT * FROM 'sensors/+/temperature' WHERE temperature > 80  -- Missing quotes around string comparison",
        fixed: "-- Correct SQL Rule\nSELECT deviceId, temperature, timestamp() as ts\nFROM 'sensors/+/temperature'\nWHERE temperature > 80.0",
        hint: "AWS IoT SQL uses numeric comparisons directly. Make sure payload field names match exactly what device publishes."
      }
    ],
    quiz: [
      { q: "InfluxDB is optimized for?", options: ["Relational data", "Time-series sensor data", "Document storage", "Graph relationships"], answer: 1 },
      { q: "AWS IoT Rules Engine processes?", options: ["Device code", "MQTT messages with SQL queries", "HTTP requests", "Database queries"], answer: 1 },
      { q: "Digital twin enables?", options: ["Physical device replacement", "Real-time virtual asset simulation", "Firmware updates", "Network monitoring"], answer: 1 },
      { q: "Kafka is used for?", options: ["Storing device configs", "High-throughput message streaming", "Device authentication", "Edge computing"], answer: 1 }
    ],
    mnc: [
      { company: "GE Digital", year: "2024", question: "Design an IoT pipeline for 50000 industrial sensors at 1Hz each.", answer: "50000 msg/s ingestion: Kafka cluster (3 brokers, 30 partitions). Schema Registry for Avro serialization. Flink for stream processing and windowed aggregations. InfluxDB cluster for time-series storage. Grafana for operations dashboard. ML pipeline on Spark for anomaly detection. Alert via PagerDuty." }
    ],
    mock: [
      { type: "Technical", question: "How would you implement a predictive maintenance solution for industrial pumps?", tip: "Vibration, temperature, current sensors at 1kHz. FFT feature extraction. Isolation Forest or LSTM autoencoder for anomaly detection. Train on 3 months normal operation. Alert when anomaly score above 0.85. Integrate with CMMS for work order generation." }
    ],
    coding: {
      problem: "Time-Series Downsampling",
      desc: "Downsample high-frequency sensor data by computing average over fixed time windows.",
      input: "data=[(0,23.1),(1,23.5),(2,22.8),(3,24.1),(4,23.9),(5,22.5)], window_size=3",
      output: "[(1, 23.13), (4, 23.5)]",
      starter: "def downsample(data: list, window_size: int) -> list:\n    result = []\n    for i in range(0, len(data), window_size):\n        window = data[i:i+window_size]\n        if window:\n            avg_ts = window[len(window)//2][0]\n            avg_val = sum(v for _, v in window) / len(window)\n            result.append((avg_ts, round(avg_val, 2)))\n    return result"
    }
  }
];
