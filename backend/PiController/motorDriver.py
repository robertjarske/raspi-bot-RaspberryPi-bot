from rrb3 import *
import sys
import tty
import termios

rr = RRB3(9.0, 6.0) # battery, motor

def main():
  while True:
    command = sys.stdin.readline()
    command = command.split('\n')[0]
    if command == "forward":
      rr.forward()
      sys.stdout.write("You said forward!\n")
    elif command == "backward":
      rr.reverse()
      sys.stdout.write("You said backward!\n")
    elif command == "left":
      rr.left()
      sys.stdout.write("You said left!\n")
    elif command == "right":
      rr.right()
      sys.stdout.write("You said right!\n")
    elif command == "stop":
      rr.stop()
      sys.stdout.write("You said stop!\n")
    else:
      sys.stdout.write("Sorry, I didn't understand that.\n")
    sys.stdout.flush()

if __name__ == '__main__':
  main()