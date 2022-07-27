#include<iostream>
#include<vector>
using namespace std;

class Solution {
    public:
        string shiftingLetters(string s, vector<int>& shifts) {
            long long int shiftAmount = 0;
            for(int i = shifts.size() - 1; i >= 0; i--) {
                shiftAmount +=  shifts[i];
                int minus = s[i] - 97;
                cout << "minus: " << minus << endl;
                s[i] = ((minus + shiftAmount ) % 26 ) + 97;
            }   
          return s;
        }
    };


int main () {
        Solution s =  
}