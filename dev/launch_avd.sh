#!/bin/bash
echo "Launching Nexus 5"

CUR_SDK=$HOME/Android/Sdk
export LD_LIBRARY_PATH=$CUR_SDK/emulator/lib64/qt/lib:$CUR_SDK/emulator/lib64/

$CUR_SDK/emulator/qemu/linux-x86_64/qemu-system-x86_64 -netdelay none -netspeed full -avd AVD_for_Nexus_6_by_Google
