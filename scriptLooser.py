import sys
# importing nse from nse tools
from nsetools import Nse
  
# creating a Nse object
nse = Nse()
top_losers = nse.get_top_losers()
print(top_losers)  
sys.stdout.flush()