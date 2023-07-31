#include "pch.h"


namespace RayCad
{



#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_vector3) {
        value_array<Vector3>("Vector3")
            .element(&Vector3::_x)
            .element(&Vector3::_y)
            .element(&Vector3::_z)
            ;
    }
#endif

}
