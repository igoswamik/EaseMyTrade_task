import sys
# importing nse from nse tools
from nsetools import Nse
  
# creating a Nse object
nse = Nse()
top_gainers = nse.get_top_gainers()

print(top_gainers)
sys.stdout.flush()