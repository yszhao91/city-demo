#define MAX_DIR 0
#define MAX_SPOT 0
#define MAX_POINT 0




#define BATCHCOLOR
 uniform bool uTexture;
 uniform bool uBlendTexture;
 uniform vec4 uOffsetScale;
 attribute vec2 aUv;
 varying vec2 vUv;varying vec2 rUv;attribute vec3 aNormal;attribute vec3 aPosition;uniform mat4 uMVMatrix;uniform mat4 uMMatrix;
 uniform mat4 uPMatrix;uniform mat4 uNMatrix;uniform mat4 uViewMatrix;uniform bool uPick;uniform bool uFix;varying vec3 vNormal;
 varying vec3 vVertex;varying vec3 vWorld;varying vec3 vPosition;
 #ifdef BATCHCOLOR 
uniform bool uBatchColor;attribute vec4 aBatchColor;varying vec4 vBatchColor;
 #endif 

 #ifdef BATCHBRIGHTNESS 
uniform bool uBatchBrightness;
attribute float aBatchBrightness;varying float vBatchBrightness;
 #endif 

 #ifdef BATCHBLEND 
uniform bool uBatchBlend;attribute vec3 aBatchBlend;varying vec3 vBatchBlend;
 #endif 

 #if MAX_DIR > 0 
uniform vec4 uDirColor[MAX_DIR];uniform vec3 uDirDirection[MAX_DIR];
 #endif 

 #if MAX_POINT > 0 
uniform vec4 uPointColor[MAX_POINT];uniform vec3 uPointPosition[MAX_POINT];
 #endif 

 #if MAX_SPOT > 0 
uniform vec4 uSpotColor[MAX_SPOT];uniform vec3 uSpotPosition[MAX_SPOT];uniform vec3 uSpotDirection[MAX_SPOT];
 #endif 

 #ifdef DASH 
uniform bool uDash;attribute float aLineDistance;varying float vLineDistance;
 #endif 
void main(void) {
    vec4 vertex = uMVMatrix * vec4(aPosition, 1.0);
    if(!uFix && !uPick){
        vNormal = vec3(uNMatrix * vec4(aNormal, 1.0));
        vVertex = vec3(vertex);vWorld = vec3(uMMatrix * vec4(aPosition, 1.0));
    }
    vPosition = vec3(aPosition);
    if(uTexture){
        vUv = uOffsetScale.xy + aUv * uOffsetScale.zw;
        }
if(uBlendTexture){rUv = aUv;}
 #ifdef BATCHCOLOR 
if(uBatchColor){vBatchColor = aBatchColor;}
 #endif 

 #ifdef BATCHBLEND 
if(uBatchBlend){vBatchBlend = aBatchBlend;}
 #endif 

 #ifdef BATCHBRIGHTNESS 
if(uBatchBrightness){
    vBatchBrightness = aBatchBrightness;
    }
 #endif 

 #ifdef DASH 
if(uDash){vLineDistance = aLineDistance;}
 #endif 
gl_Position = uPMatrix * vertex;
}