from rrb3 import *
from threading import Timer
import sys
import tty
import termios


rr = RRB3(9.0, 6.0) # battery, motor

ongoing = True

def stop():
  print('should stop')
  ongoing = False

s = Timer(0.1, stop, ())
l = Timer(0.2, stop, ())

try:
  while ongoing:
    if sys.argv[1] == 'forward':
      print('forward')
      rr.forward()
      l.start()
      ongoing = False
    elif sys.argv[1] == 'backward':
      print('backward')
      rr.reverse()
      l.start()
      ongoing = False
    elif sys.argv[1] == 'left':
      print('left')
      rr.left()
      s.start()
      ongoing = False
    elif sys.argv[1] == 'right':
      print('right')
      rr.right()
      s.start()
      ongoing = False
    elif sys.argv[1] == 'stop':
      print('stop')
      rr.stop()
      s.start()
      ongoing = False

except KeyboardInterrupt:
  exit()