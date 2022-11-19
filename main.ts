function Box1 () {
    Go_Start()
    Line_Follow()
    Turn_Right()
    Line_Reverse()
    Line_Follow()
    Turn_Right()
    Line_Reverse()
    Line_Follow()
    Turn_Right()
    Line_Reverse()
    Line_Follow()
    Turn_Left()
    Line_Reverse()
    Line_Follow()
    Servo_kick()
}
function Go_Start () {
    MyRobotBit.MotorAB(motorDIR.Forward, Left_Speed, Right_Speed)
    basic.pause(1200)
}
function Turn_Right () {
    Motor_Stop()
    MyRobotBit.Rotate(Turn.Right, Turn_Speed, Turn_right_ms)
    Motor_Stop()
}
function Go_60_Cm () {
    Forward(Speed, 1)
}
function Go_to_wins () {
    MyRobotBit.MotorAB(motorDIR.Forward, Left_Speed, Sloow_speed_B)
    basic.pause(550)
    Motor_Stop()
}
function Forward (Motor_Speed: number, Time: number) {
    Tune_Motor(Motor_Speed)
    MyRobotBit.MotorAB(motorDIR.Forward, Left_Speed, Right_Speed)
    basic.pause(Time)
}
function Tune_Motor (Motor_Speed: number) {
    if (Motor_Speed <= 70) {
        Left_Speed = Motor_Speed - 0
        Right_Speed = Motor_Speed - 0
    } else {
        Left_Speed = Motor_Speed - 0
        Right_Speed = Motor_Speed - 0
    }
}
function Line_Reverse () {
    Backward(Slow_Speed, 1)
    Status = 0
    while (Status == 0) {
        Convert_2_Analog()
        if (BL == 0 && BR == 0) {
            Status = 1
        } else if (BL == 0 && BR == 1) {
            MyRobotBit.motorOFF(motorSEL.M12, StopMode.Brake)
            MyRobotBit.MotorON(motorSEL.M2, motorDIR.Reverse, Slow_Speed)
            while (BR == 1) {
                Convert_2_Analog()
            }
            Status = 2
        } else if (BL == 1 && BR == 0) {
            MyRobotBit.motorOFF(motorSEL.M12, StopMode.Brake)
            MyRobotBit.MotorON(motorSEL.M1, motorDIR.Reverse, Slow_Speed)
            while (BL == 1) {
                Convert_2_Analog()
            }
            Status = 3
        }
    }
    Motor_Stop()
}
function Points_2 () {
    Line_Follow()
    Turn_Left()
    Go_30_Cm()
    Turn_Left()
    Line_Reverse()
    Line_Follow()
    Turn_Right()
}
function Servo_kick () {
    MyRobotBit.MotorAB(motorDIR.Forward, Left_Speed, Sloow_speed_B)
    basic.pause(100)
    Motor_Stop()
    MyServo.ServoRun(Servo.Servo11, 44)
    basic.pause(800)
    MyServo.ServoRun(Servo.Servo11, 110)
    basic.pause(600)
    MyServo.ServoStop(Servo.Servo11)
}
input.onButtonPressed(Button.A, function () {
    for (let index = 0; index < 4; index++) {
        OLED.init(128, 64)
        OLED.clear()
        OLED.writeString("L2=")
        OLED.writeNum(MySensor.analogRead(MySensor.analogPort.P0))
        OLED.newLine()
        OLED.writeString("L1=")
        OLED.writeNum(MySensor.analogRead(MySensor.analogPort.P1))
        OLED.newLine()
        OLED.writeString("R1=")
        OLED.writeNum(MySensor.analogRead(MySensor.analogPort.P2))
        OLED.newLine()
        OLED.writeString("R2=")
        OLED.writeNum(MySensor.analogRead(MySensor.analogPort.P3))
        OLED.newLine()
        OLED.writeString("BL=")
        OLED.writeNum(MySensor.analogRead(MySensor.analogPort.P4))
        OLED.newLine()
        OLED.writeString("BR=")
        OLED.writeNum(MySensor.analogRead(MySensor.analogPort.P10))
        basic.pause(200)
    }
})
function Uturn () {
    let Uturn_ms = 0
    Motor_Stop()
    MyRobotBit.Rotate(Turn.Right, Turn_Speed, Uturn_ms)
    Motor_Stop()
}
function Read_2_Analog () {
    BL = MySensor.analogRead(MySensor.analogPort.P4)
    BR = MySensor.analogRead(MySensor.analogPort.P10)
}
function Turn_Left () {
    Motor_Stop()
    MyRobotBit.Rotate(Turn.Left, Turn_Speed, Turn_left_ms)
    Motor_Stop()
}
function Convert_4_Analog () {
    Read_4_Analog()
    if (L2 < Ref_L2) {
        L2 = 0
    } else {
        L2 = 1
    }
    if (L1 < Ref_L1) {
        L1 = 0
    } else {
        L1 = 1
    }
    if (R1 < Ref_R1) {
        R1 = 0
    } else {
        R1 = 1
    }
    if (R2 < Ref_R2) {
        R2 = 0
    } else {
        R2 = 1
    }
}
function Box4 () {
    Uturn()
    Line_Follow()
    Turn_Right()
    Line_Reverse()
    Line_Follow()
    Servo_kick()
}
function Convert_2_Analog () {
    Convert_2_Analog()
    if (BL < Ref_BL) {
        BL = 0
    } else {
        BL = 1
    }
    if (BR < Ref_BR) {
        BR = 0
    } else {
        BR = 1
    }
}
function Go_30_Cm () {
    Forward(Speed, 1)
}
input.onButtonPressed(Button.B, function () {
    basic.pause(2000)
    Line_Reverse()
})
function Points_1 () {
    Uturn()
    Line_Reverse()
    Go_30_Cm()
    Turn_Left()
    Line_Reverse()
    Line_point()
}
function Line_Follow () {
    Loop = true
    while (Loop) {
        let line_revers_ms = 0
        if (MySensor.analogRead(MySensor.analogPort.P0) > L2 && MySensor.analogRead(MySensor.analogPort.P1) > L1 && (MySensor.analogRead(MySensor.analogPort.P2) > R1 && MySensor.analogRead(MySensor.analogPort.P3) > R2)) {
            MyRobotBit.MotorAB(motorDIR.Forward, ACC_Speed, Turn_Speed)
        } else if (MySensor.analogRead(MySensor.analogPort.P0) < L2 && MySensor.analogRead(MySensor.analogPort.P1) > L1 && (MySensor.analogRead(MySensor.analogPort.P2) > R1 && MySensor.analogRead(MySensor.analogPort.P3) > R2)) {
            MyRobotBit.MotorON(motorSEL.M12, motorDIR.Reverse, Slow_Speed)
            basic.pause(450)
            MyRobotBit.RotateNOTIME(Turn.Right, Slow_Speed)
            basic.pause(70)
        } else if (MySensor.analogRead(MySensor.analogPort.P0) > L2 && MySensor.analogRead(MySensor.analogPort.P1) > L1 && (MySensor.analogRead(MySensor.analogPort.P2) > R1 && MySensor.analogRead(MySensor.analogPort.P3) < R2)) {
            MyRobotBit.MotorON(motorSEL.M12, motorDIR.Reverse, Slow_Speed)
            basic.pause(450)
            MyRobotBit.RotateNOTIME(Turn.Left, Slow_Speed)
            basic.pause(70)
        } else if (MySensor.analogRead(MySensor.analogPort.P0) > L2 && MySensor.analogRead(MySensor.analogPort.P1) < L1 && (MySensor.analogRead(MySensor.analogPort.P2) > R1 && MySensor.analogRead(MySensor.analogPort.P3) > R2)) {
            Loop = false
            MyRobotBit.MotorAB(motorDIR.Reverse, ACC_Speed, Turn_Speed)
            basic.pause(line_revers_ms)
            Motor_Stop()
        } else if (MySensor.analogRead(MySensor.analogPort.P0) > L2 && MySensor.analogRead(MySensor.analogPort.P1) > L1 && (MySensor.analogRead(MySensor.analogPort.P2) < R1 && MySensor.analogRead(MySensor.analogPort.P3) > R2)) {
            Loop = false
            MyRobotBit.MotorAB(motorDIR.Reverse, ACC_Speed, Turn_Speed)
            basic.pause(line_revers_ms)
            Motor_Stop()
        } else if (MySensor.analogRead(MySensor.analogPort.P0) > L2 && MySensor.analogRead(MySensor.analogPort.P1) < L1 && (MySensor.analogRead(MySensor.analogPort.P2) < R1 && MySensor.analogRead(MySensor.analogPort.P3) > R2)) {
            Loop = false
            MyRobotBit.MotorAB(motorDIR.Reverse, ACC_Speed, Turn_Speed)
            basic.pause(line_revers_ms)
            Motor_Stop()
        }
    }
    Motor_Stop()
}
function Box3 () {
    Uturn()
    Line_Follow()
    Turn_Left()
    Line_Reverse()
    Go_90_Cm()
    Turn_Right()
    Line_Reverse()
    Line_Follow()
    Turn_Left()
    Line_Follow()
    Turn_Left()
    Line_Reverse()
    Line_Follow()
    Servo_kick()
}
function Go_90_Cm () {
    Forward(Speed, 1)
}
function Line_point () {
    Line_Follow()
    Uturn()
    Line_Reverse()
}
function Read_4_Analog () {
    L2 = MySensor.analogRead(MySensor.analogPort.P0)
    L1 = MySensor.analogRead(MySensor.analogPort.P1)
    R1 = MySensor.analogRead(MySensor.analogPort.P2)
    R2 = MySensor.analogRead(MySensor.analogPort.P3)
    BL = MySensor.analogRead(MySensor.analogPort.P4)
    BR = MySensor.analogRead(MySensor.analogPort.P10)
}
function Box2 () {
    Uturn()
    Go_30_Cm()
    Turn_Right()
    Line_Reverse()
    Go_90_Cm()
    Turn_Right()
    Line_Follow()
    Turn_Right()
    Line_Follow()
    Servo_kick()
}
function Backward (Motor_Speed: number, Time: number) {
    Tune_Motor(Motor_Speed)
    MyRobotBit.MotorAB(motorDIR.Reverse, Left_Speed - 0, Right_Speed - 0)
    basic.pause(Time)
}
function Motor_Stop () {
    MyRobotBit.motorOFF(motorSEL.M12, StopMode.Brake)
    basic.pause(100)
}
function Back_to_start () {
    Line_Follow()
    Turn_Right()
    Line_Reverse()
    Go_90_Cm()
    Turn_Right()
    Line_Follow()
    Turn_Right()
    Line_Reverse()
    Line_Follow()
    Turn_Right()
    Line_Reverse()
    Line_Follow()
    Turn_Left()
    Line_Reverse()
    Line_Follow()
    Turn_Left()
    Line_Reverse()
    Line_Follow()
    Turn_Left()
    Line_Reverse()
    Line_Follow()
    Go_to_wins()
}
let Loop = false
let R2 = 0
let R1 = 0
let L1 = 0
let L2 = 0
let BR = 0
let BL = 0
let Status = 0
let Sloow_speed_B = 0
let Right_Speed = 0
let Left_Speed = 0
let Ref_BR = 0
let Ref_BL = 0
let Ref_R2 = 0
let Ref_R1 = 0
let Ref_L1 = 0
let Ref_L2 = 0
let Turn_right_ms = 0
let Turn_left_ms = 0
let Turn_Speed = 0
let Slow_Speed = 0
let ACC_Speed = 0
let Speed = 0
Speed = 70
ACC_Speed = 100
Slow_Speed = 50
Turn_Speed = 70
Turn_left_ms = 0
Turn_right_ms = 0
let Go_30_ms = 0
let Go_60_ms = 0
let Go_90_ms = 0
led.enable(false)
Ref_L2 = 605
Ref_L1 = 259
Ref_R1 = 240
Ref_R2 = 606
Ref_BL = 247
Ref_BR = 305
