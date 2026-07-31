import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

export const ECE_MODULES: BranchModuleData[] = [
  {
    moduleTitle: "Embedded Systems & Communication Protocols",
    level: "Level 1 – Hardware Core",
    branch: ["ece"],
    videos: makeVideoLinks("I2C SPI UART Protocols Embedded Systems"),
    studyMaterial: {
      summary: `Microcontrollers communicate with external sensors and peripherals using serial protocols:
- I2C (Inter-Integrated Circuit): 2 wires (SDA data, SCL clock). Multi-master, 7-bit/10-bit addressing.
- SPI (Serial Peripheral Interface): 4 wires (MOSI, MISO, SCK, CS). Synchronous full-duplex, high speed.
- UART (Universal Asynchronous Receiver-Transmitter): 2 wires (Tx, Rx). Asynchronous with start/stop bits & baud rate.`,
      keyPoints: [
        "I2C requires open-drain pull-up resistors on SDA and SCL bus lines.",
        "SPI supports faster clock speeds than I2C but requires dedicated Chip Select (CS) per slave device.",
        "UART requires both sender and receiver to agree on exact Baud Rate (e.g. 9600, 115200 bps).",
        "Interrupt Service Routines (ISR) must be ultra-fast and avoid blocking delays."
      ],
      example: `// C Pseudo-code for I2C Master Write
void I2C_Write(uint8_t dev_addr, uint8_t reg, uint8_t data) {
    I2C_Start();
    I2C_SendByte(dev_addr << 1); // Write mode
    I2C_WaitAck();
    I2C_SendByte(reg);
    I2C_WaitAck();
    I2C_SendByte(data);
    I2C_WaitAck();
    I2C_Stop();
}`,
      complexity: "I2C: 100kbps - 3.4Mbps | SPI: Up to 50+ Mbps"
    },
    aiExplain: {
      steps: [
        "1. Select communication protocol based on distance, speed, and pin constraints.",
        "2. Configure clock speed (SCL/SCK) and baud rate.",
        "3. Master sends Start Condition -> Address byte + R/W bit.",
        "4. Slave responds with ACK (Acknowledge).",
        "5. Transfer data bytes -> Master sends Stop Condition."
      ],
      analogy: "I2C is like a party walkie-talkie channel with call signs (addresses); SPI is a direct private 4-wire telephone link; UART is sending text messages at a agreed typing speed!"
    },
    debug: [
      {
        title: "Fix I2C Address Shift Bug",
        buggy: `// Bug: Sending raw 7-bit address without left shifting for Write bit\nvoid send_addr(uint8_t addr) {\n    I2C_Transmit(addr); // Forgot (addr << 1)\n}`,
        fixed: `void send_addr(uint8_t addr, uint8_t read_write) {\n    I2C_Transmit((addr << 1) | (read_write & 0x01));\n}`,
        hint: "I2C 7-bit device addresses must be left-shifted by 1 bit, placing the Read/Write flag in bit 0."
      }
    ],
    quiz: [
      { q: "Which serial protocol uses SDA and SCL wires?", options: ["UART", "SPI", "I2C", "CAN"], answer: 2 },
      { q: "How many wires does standard SPI require?", options: ["2", "3", "4", "5"], answer: 2 },
      { q: "What is required on I2C bus lines SDA and SCL?", options: ["Capacitors", "Pull-up resistors", "Zener diodes", "Inductors"], answer: 1 },
      { q: "Which protocol is asynchronous?", options: ["I2C", "SPI", "UART", "JTAG"], answer: 2 },
      { q: "What does MOSI stand for in SPI?", options: ["Master Out Slave In", "Master Option Serial Input", "Main Output Signal Isolation", "Memory Offset Storage Index"], answer: 0 }
    ],
    mnc: [
      { company: "Texas Instruments", year: "2023", question: "Compare I2C vs SPI for onboard sensor communication", answer: "I2C uses only 2 wires saving microcontroller pins; SPI offers higher bandwidth and lower power for display/flash memories." },
      { company: "Qualcomm", year: "2023", question: "What is the purpose of an Interrupt Service Routine (ISR)?", answer: "Executes immediately when hardware trigger occurs, pausing main loop; must not call blocking functions." },
      { company: "Bosch", year: "2022", question: "What is CAN bus protocol used for in Automotive ECE?", answer: "Controller Area Network (CAN) is a robust differential 2-wire serial bus for automotive ECU communication." }
    ],
    mock: [
      { type: "Technical", question: "What causes I2C bus lockup and how do you recover?", tip: "Occurs when a slave holds SDA LOW expecting clock pulses. Fix by toggling SCL 9 times manually from master." }
    ],
    coding: {
      problem: "I2C Address Converter",
      desc: "Convert a 7-bit I2C address and read/write bit into an 8-bit control byte.",
      input: "address = 0x3C, is_read = True",
      output: "0x79",
      starter: `def get_i2c_control_byte(addr_7bit, is_read):\n    # Return 8-bit control byte\n    pass`
    }
  }
];
