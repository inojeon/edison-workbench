#include "pch.h"


std::vector<std::string> split(const std::string& s, const char delim)
{
    vector<std::string> elems;
    split(s, delim, back_inserter(elems));
    return elems;
}


template<typename Out> void split(const std::string& s, const char delim, Out  result)
{
    stringstream ss(s);
    std::string item;

    while (getline(ss, item, delim))
        *(result++) = item;
}
