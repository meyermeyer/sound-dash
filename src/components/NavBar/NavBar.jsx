import React from 'react';
import CurrentUser from '../CurrentUser/CurrentUser'
import Menu from '../Menu/Menu'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCollaborators from '../AddCollaborators/AddCollaborators';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: .5,
  },
  project: {
    flexGrow: .5
  }
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <Button color="inherit"><CurrentUser /></Button> */}
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="24pt" height="24pt" viewBox="0 0 1009.000000 1009.000000"
            preserveAspectRatio="xMidYMid meet">
            <metadata>
            Created by potrace 1.11, written by Peter Selinger 2001-2013
            </metadata>
            <g transform="translate(0.000000,1009.000000) scale(0.100000,-0.100000)"
                        fill="#FFFFFF" borderRadius="5px">
            <path d="M0 5045 l0 -5045 40 0 40 0 0 131 0 131 303 -6 c166 -3 631 -11 1032
            -17 402 -6 858 -14 1015 -18 l285 -6 3 -107 3 -108 364 0 365 0 0 106 0 106
            293 -6 c160 -4 665 -11 1122 -17 456 -6 832 -13 835 -16 6 -6 7 -20 9 -108 l1
            -65 311 0 311 0 -3 80 c-2 43 -1 82 3 85 3 3 273 1 599 -4 327 -6 762 -14 967
            -17 l372 -6 0 -69 0 -69 275 0 275 0 0 66 0 66 527 -6 c291 -3 576 -9 636 -12
            l107 -6 0 95 0 94 -177 7 c-98 3 -329 8 -513 11 -184 3 -390 8 -457 11 l-123
            6 0 194 0 194 72 0 c100 0 1003 -28 1111 -35 l87 -5 0 89 0 89 -107 6 c-60 3
            -178 8 -263 11 -332 11 -700 25 -797 31 l-103 6 0 200 0 199 43 -5 c23 -3 155
            -10 292 -16 271 -12 746 -36 863 -45 l72 -6 0 94 0 94 -92 7 c-51 4 -178 11
            -283 16 -454 21 -832 42 -862 46 l-33 5 0 194 c0 107 3 196 8 198 4 2 59 0
            122 -4 63 -5 315 -22 560 -39 245 -17 475 -33 513 -36 l67 -7 0 91 0 90 -67 6
            c-38 4 -167 13 -288 21 -359 25 -632 44 -763 55 -67 5 -129 10 -137 10 -13 0
            -15 27 -13 198 3 190 4 197 23 195 11 -1 81 -6 155 -12 74 -6 346 -29 605 -51
            258 -22 473 -40 477 -40 4 0 8 423 8 940 l0 940 -22 5 c-13 3 -90 14 -173 25
            -82 12 -242 34 -355 50 -361 51 -708 100 -714 100 -8 0 -8 395 0 403 3 3 16 2
            27 -3 12 -4 58 -13 102 -19 44 -7 136 -21 205 -31 105 -17 410 -64 655 -101
            33 -5 105 -16 159 -24 55 -8 103 -15 108 -15 4 0 8 1226 8 2725 l0 2725 -5045
            0 -5045 0 0 -5045z m210 4801 c58 -14 209 -50 335 -81 127 -30 280 -67 340
            -81 61 -14 118 -30 127 -35 10 -5 26 -9 35 -9 18 0 180 -37 283 -64 30 -8 143
            -36 250 -61 107 -25 211 -50 230 -55 19 -6 105 -26 190 -46 322 -75 568 -135
            648 -156 l82 -23 -2 -235 -3 -235 -25 3 c-14 1 -43 7 -65 12 -22 6 -121 28
            -220 50 -99 23 -225 51 -280 65 -55 13 -131 30 -170 39 -94 20 -362 81 -510
            116 -329 77 -387 90 -405 90 -10 0 -21 4 -24 9 -3 4 -27 11 -53 15 -27 3 -133
            26 -238 50 -190 45 -466 108 -560 128 -27 6 -60 13 -73 17 l-23 6 0 245 c-1
            293 -2 270 14 265 6 -2 59 -15 117 -29z m75 -757 c227 -53 637 -145 800 -180
            50 -10 137 -30 195 -44 58 -14 236 -54 395 -90 160 -35 315 -71 345 -79 30 -7
            73 -17 95 -20 75 -13 590 -127 603 -134 11 -6 13 -55 12 -237 0 -126 -3 -231
            -6 -234 -5 -5 -89 11 -354 69 -80 17 -253 54 -385 81 -286 60 -437 91 -565
            119 -52 12 -158 34 -235 50 -77 16 -216 46 -310 65 -274 58 -724 152 -772 161
            -22 4 -22 6 -25 252 -2 136 -1 251 1 255 4 10 34 5 206 -34z m3309 -58 c61
            -16 174 -43 251 -61 77 -17 151 -36 165 -40 14 -5 41 -12 60 -15 38 -8 357
            -84 585 -140 77 -19 217 -53 310 -75 94 -23 215 -53 270 -66 55 -14 138 -34
            185 -44 47 -11 130 -31 185 -45 55 -14 101 -25 102 -25 2 0 3 -99 3 -220 0
            -250 8 -232 -90 -205 -30 9 -107 26 -170 40 -102 21 -189 42 -500 116 -47 11
            -125 28 -175 39 -49 10 -135 29 -190 43 -55 14 -127 31 -160 37 -33 7 -132 29
            -220 50 -151 35 -342 79 -570 130 -55 13 -121 29 -147 37 l-48 14 0 229 c0
            269 -18 246 154 201z m-3464 -651 c33 -10 134 -32 545 -115 94 -19 280 -57
            415 -85 135 -28 277 -58 315 -65 39 -8 124 -25 190 -39 66 -14 197 -41 290
            -61 94 -20 247 -51 340 -70 382 -77 470 -95 487 -101 17 -5 18 -24 18 -240 0
            -130 -4 -234 -9 -234 -5 0 -53 9 -107 19 -55 11 -151 29 -214 41 -63 12 -169
            32 -235 45 -66 13 -228 45 -360 70 -132 26 -294 57 -360 70 -66 13 -149 29
            -185 35 -36 6 -92 17 -125 25 -33 8 -112 24 -175 35 -63 12 -182 35 -265 52
            -82 17 -175 35 -205 40 -50 8 -148 27 -334 64 -38 7 -70 15 -72 17 -2 2 -7
            467 -4 500 0 9 9 9 50 -3z m80 -751 c63 -11 162 -30 220 -41 58 -11 168 -31
            245 -44 123 -21 347 -65 485 -94 25 -5 61 -12 80 -15 66 -10 305 -54 435 -80
            72 -14 202 -39 290 -55 88 -16 230 -43 315 -59 85 -17 193 -37 240 -46 47 -9
            112 -21 145 -28 l60 -13 3 -229 c1 -126 -2 -233 -6 -237 -6 -6 -45 -2 -93 7
            -46 10 -133 25 -194 35 -120 20 -503 88 -710 126 -71 13 -220 39 -330 58 -110
            19 -252 44 -315 56 -63 11 -207 36 -320 56 -113 19 -209 36 -215 38 -13 4 -74
            14 -155 27 -36 6 -120 22 -188 35 -68 13 -124 24 -125 24 -1 0 -2 113 -2 250
            0 160 4 250 10 250 6 0 62 -9 125 -21z m6300 -564 c74 -14 173 -34 220 -45 84
            -19 307 -66 385 -80 50 -10 350 -71 730 -151 160 -33 313 -65 340 -70 107 -20
            95 8 95 -219 0 -109 -4 -201 -9 -204 -9 -6 -237 34 -311 54 -19 5 -64 14 -100
            20 -36 6 -83 15 -105 21 -22 5 -78 16 -125 24 -47 8 -132 24 -190 36 -58 11
            -136 26 -175 34 -38 7 -128 25 -200 39 -71 14 -227 43 -345 66 -118 22 -233
            45 -255 50 -22 5 -56 12 -75 15 -76 14 -70 -6 -70 224 0 114 3 211 7 215 4 4
            17 5 28 2 11 -3 81 -16 155 -31z m-2500 -150 c83 -15 357 -67 555 -105 55 -11
            118 -22 140 -25 22 -3 47 -8 55 -11 8 -3 62 -14 120 -24 58 -10 155 -28 215
            -40 61 -12 155 -30 210 -40 233 -42 332 -61 365 -68 l35 -8 3 -214 c1 -117 -1
            -217 -5 -221 -5 -4 -62 3 -128 16 -66 13 -217 40 -335 61 -241 41 -302 52
            -510 89 -80 15 -230 42 -335 60 -104 18 -255 45 -335 60 -80 14 -247 43 -372
            65 -125 21 -232 41 -238 45 -15 9 -14 452 2 457 6 2 115 -15 242 -39 127 -24
            269 -50 316 -58z m-3759 -30 c85 -14 174 -29 199 -35 38 -8 281 -50 535 -91
            33 -5 148 -25 255 -44 107 -19 251 -44 320 -55 69 -11 163 -27 210 -36 115
            -21 512 -88 635 -108 55 -9 136 -23 180 -31 78 -15 123 -23 138 -24 9 -1 9
            -468 -1 -474 -4 -3 -70 6 -147 19 -77 13 -174 29 -215 35 -41 6 -158 24 -260
            40 -204 33 -387 62 -525 84 -94 14 -266 42 -470 75 -66 11 -133 21 -150 24
            -67 9 -317 49 -430 67 -66 11 -192 31 -280 45 -88 14 -161 27 -163 29 -2 2 -4
            419 -2 498 0 10 4 16 8 13 5 -3 78 -17 163 -31z m3317 -570 c48 -8 209 -35
            357 -60 149 -26 344 -60 435 -75 91 -16 217 -38 280 -49 63 -12 160 -28 215
            -36 55 -8 120 -19 145 -24 48 -10 105 -20 290 -51 63 -11 180 -31 259 -45 79
            -14 148 -25 152 -25 12 0 11 -427 0 -434 -5 -3 -33 -2 -62 3 -30 6 -117 19
            -194 31 -128 20 -362 57 -880 140 -104 17 -291 47 -415 66 -124 19 -279 44
            -345 54 -66 11 -165 26 -220 35 -55 8 -110 17 -122 20 l-23 5 0 229 c0 227 3
            251 33 234 4 -3 47 -11 95 -18z m-3339 -155 c157 -26 275 -44 416 -65 61 -10
            148 -24 195 -32 47 -8 148 -23 225 -34 77 -10 181 -26 230 -34 179 -30 212
            -35 315 -50 182 -27 233 -35 290 -44 30 -6 105 -17 165 -26 61 -8 148 -22 195
            -30 47 -8 121 -20 165 -26 44 -6 130 -18 190 -27 l110 -17 3 -239 2 -239 -42
            7 c-24 3 -110 15 -193 26 -82 11 -211 29 -285 40 -74 11 -236 34 -360 50 -124
            17 -265 37 -315 45 -49 8 -130 19 -178 25 -49 6 -164 22 -255 36 -92 13 -234
            33 -317 45 -82 11 -213 29 -290 40 -77 12 -169 25 -205 29 -137 19 -202 29
            -206 33 -3 3 -7 443 -4 500 0 10 8 9 149 -13z m3356 -519 c39 -6 111 -18 160
            -26 50 -8 180 -28 290 -45 110 -17 254 -40 320 -50 66 -11 199 -31 295 -45 96
            -14 229 -34 295 -45 66 -11 167 -26 225 -35 58 -9 200 -32 316 -51 117 -19
            215 -34 218 -34 3 0 6 -97 6 -215 0 -208 -1 -215 -20 -215 -11 0 -131 16 -267
            36 -137 20 -275 40 -308 44 -119 17 -224 31 -495 70 -151 21 -439 62 -640 90
            -201 28 -403 56 -450 63 l-85 13 -3 219 c-1 121 0 226 3 233 3 9 15 12 37 8
            18 -3 65 -10 103 -15z m-3210 -246 c72 -9 207 -28 300 -41 94 -13 240 -33 325
            -44 85 -11 218 -29 295 -40 77 -10 226 -31 330 -44 105 -14 253 -35 330 -46
            77 -11 178 -25 225 -31 47 -6 162 -22 255 -36 94 -14 197 -28 230 -32 l60 -6
            3 -229 c1 -126 -1 -233 -5 -237 -5 -5 -40 -4 -78 1 -39 6 -149 19 -245 30 -96
            11 -204 25 -240 30 -36 5 -146 19 -245 31 -99 11 -243 29 -320 39 -77 11 -232
            31 -345 45 -113 14 -416 52 -675 85 -259 33 -476 60 -482 60 -10 0 -13 57 -13
            254 l0 253 83 -12 c45 -7 141 -21 212 -30z m3280 -449 c61 -9 227 -31 370 -51
            143 -20 360 -49 483 -65 122 -17 331 -46 465 -65 133 -19 316 -44 407 -56 91
            -12 201 -27 245 -33 l80 -11 3 -209 c1 -115 -1 -213 -5 -217 -5 -4 -510 55
            -1123 131 -613 77 -1121 140 -1127 140 -10 0 -12 49 -8 223 3 122 5 226 5 231
            0 9 17 8 205 -18z m-3346 -271 c113 -14 298 -36 411 -50 113 -14 268 -32 345
            -41 213 -24 293 -33 375 -44 41 -5 154 -18 250 -30 96 -11 281 -33 410 -50
            129 -16 321 -39 425 -51 105 -11 193 -23 198 -26 4 -2 7 -108 7 -235 l0 -230
            -77 6 c-43 4 -112 11 -153 16 -41 6 -183 21 -315 35 -132 13 -368 38 -525 55
            -266 28 -378 40 -1005 106 -294 30 -567 62 -571 67 -3 2 -6 445 -4 490 0 10
            -2 10 229 -18z m3431 -410 c118 -14 265 -32 325 -40 61 -8 135 -17 165 -20 84
            -8 955 -112 1226 -145 133 -17 244 -30 248 -30 3 0 6 -97 6 -215 l0 -215 -24
            0 c-24 0 -239 22 -396 40 -108 13 -688 75 -885 95 -82 8 -186 20 -230 25 -44
            5 -215 23 -380 40 -165 17 -310 34 -322 38 -22 7 -22 10 -26 229 -2 122 -1
            225 2 229 3 3 22 3 41 0 19 -3 132 -17 250 -31z m-3490 -324 c58 -6 177 -18
            265 -26 88 -9 171 -18 185 -20 14 -3 124 -14 245 -25 121 -12 279 -27 350 -35
            182 -20 394 -42 570 -60 271 -27 739 -75 800 -83 l60 -7 3 -234 3 -234 -78 7
            c-43 4 -150 14 -238 22 -88 8 -209 19 -270 24 -60 5 -186 16 -280 25 -93 8
            -296 26 -450 40 -154 14 -350 32 -435 39 -85 8 -240 22 -345 31 -491 44 -555
            50 -555 58 0 4 0 117 0 251 l0 245 33 -4 c17 -2 79 -9 137 -14z m6672 -56
            c296 -34 428 -50 663 -79 198 -25 257 -32 510 -62 72 -8 140 -17 153 -20 22
            -4 22 -5 22 -205 l0 -200 -32 5 c-18 3 -98 12 -178 21 -464 49 -636 67 -815
            85 -110 11 -211 23 -225 25 -14 3 -97 12 -185 20 -170 16 -402 41 -472 51
            l-43 5 0 208 c0 114 2 210 5 212 2 3 89 -5 192 -18 103 -12 286 -34 405 -48z
            m-3037 -315 c160 -17 380 -39 490 -50 110 -11 308 -31 440 -44 381 -40 529
            -55 705 -72 91 -9 171 -18 178 -20 9 -2 12 -54 12 -213 0 -115 -3 -212 -8
            -215 -4 -2 -77 2 -162 10 -85 7 -284 25 -441 39 -260 22 -808 71 -1409 125
            -124 11 -231 23 -238 25 -11 4 -13 43 -8 203 3 108 5 210 6 226 l0 29 73 -6
            c39 -4 203 -20 362 -37z m2696 -275 c134 -13 333 -34 442 -45 108 -11 286 -29
            395 -40 108 -11 238 -24 287 -30 50 -5 182 -19 295 -30 113 -11 220 -23 238
            -26 l32 -5 0 -201 0 -201 -41 7 c-22 4 -167 17 -322 31 -155 13 -358 31 -452
            40 -326 29 -392 35 -680 61 -159 14 -326 29 -370 33 l-80 6 -1 205 c-1 182 0
            220 10 220 1 0 112 -11 247 -25z m-6216 -105 c93 -8 545 -46 1360 -114 99 -9
            212 -18 250 -21 150 -12 653 -55 703 -60 l52 -6 0 -236 0 -236 -57 7 c-32 3
            -128 10 -213 16 -85 5 -246 17 -357 25 -112 8 -294 22 -405 30 -204 15 -247
            18 -763 55 -236 17 -844 60 -852 60 -2 0 -3 113 -3 251 l0 252 88 -6 c48 -4
            137 -11 197 -17z m3201 -270 c61 -5 169 -14 240 -20 71 -5 179 -14 239 -19
            122 -12 1597 -136 1663 -141 1 0 1 -98 0 -217 -3 -211 -4 -218 -23 -216 -11 1
            -94 7 -185 13 -91 6 -340 24 -555 40 -214 16 -615 45 -890 65 -453 32 -605 43
            -612 44 -7 2 -2 461 5 461 4 0 57 -5 118 -10z m2949 -250 c77 -5 190 -14 250
            -20 161 -14 691 -59 825 -70 63 -5 167 -14 230 -20 63 -5 169 -15 235 -20 66
            -6 141 -13 168 -16 l47 -6 0 -199 0 -200 -57 6 c-32 3 -188 14 -348 25 -159
            11 -380 27 -490 35 -110 8 -270 20 -355 25 -169 12 -366 26 -560 40 -69 5
            -128 10 -132 10 -5 0 -8 94 -8 209 0 216 1 223 40 215 8 -2 78 -8 155 -14z
            m-6025 -215 c201 -14 475 -32 610 -40 135 -8 369 -24 520 -35 151 -11 419 -29
            595 -40 176 -12 363 -24 415 -28 l95 -7 3 -234 2 -234 -137 6 c-76 4 -264 14
            -418 22 -154 8 -368 19 -475 25 -367 18 -765 40 -1005 54 -132 8 -303 18 -380
            21 -251 12 -240 10 -239 37 1 12 2 127 3 254 l1 231 23 -3 c12 -2 186 -15 387
            -29z m3110 -210 c104 -7 467 -31 835 -55 171 -11 369 -24 440 -30 72 -5 245
            -17 385 -26 140 -8 298 -19 350 -22 l95 -7 3 -209 c1 -115 -1 -213 -6 -218 -4
            -4 -86 -3 -182 2 -309 18 -897 50 -1170 64 -514 28 -855 48 -877 52 -22 4 -23
            8 -23 132 -1 70 -3 167 -6 215 -7 112 -5 119 43 113 21 -3 72 -8 113 -11z
            m3155 -210 c198 -14 466 -32 595 -40 129 -8 332 -22 450 -31 118 -8 270 -19
            338 -23 67 -5 125 -10 127 -13 6 -6 8 -389 1 -395 -3 -3 -92 0 -198 6 -194 11
            -348 20 -1173 66 -247 13 -478 27 -512 30 l-62 6 -1 210 -1 209 38 0 c21 0
            200 -11 398 -25z m-6315 -315 c230 -11 466 -22 915 -45 154 -8 523 -26 820
            -41 297 -15 544 -30 548 -34 4 -4 5 -109 1 -234 l-7 -227 -126 6 c-69 3 -385
            15 -701 25 -316 11 -746 27 -955 35 -209 8 -485 19 -613 24 -128 5 -235 11
            -237 13 -3 3 -8 435 -5 491 0 4 33 5 73 2 39 -3 169 -10 287 -15z m3420 -171
            c654 -30 880 -41 1320 -64 267 -13 495 -25 508 -25 l22 0 0 -216 0 -217 -202
            7 c-112 4 -369 13 -573 21 -203 8 -545 22 -760 30 -214 8 -465 18 -557 21
            l-168 7 0 230 0 229 98 -6 c53 -4 194 -11 312 -17z m2725 -134 c66 -3 350 -17
            630 -30 281 -14 609 -29 730 -35 121 -6 244 -13 273 -16 l52 -5 0 -200 0 -200
            -147 5 c-82 4 -382 15 -668 26 -286 11 -632 25 -770 30 -137 6 -274 10 -302
            10 l-53 0 0 215 0 215 68 -5 c37 -2 121 -7 187 -10z m-5725 -435 c362 -12
            1085 -37 1435 -50 149 -5 305 -10 348 -10 l77 0 0 -232 0 -231 -368 6 c-781
            14 -2052 37 -2157 40 l-110 2 -3 249 -2 249 247 -7 c137 -4 376 -11 533 -16z
            m3812 -124 c560 -17 1020 -35 1024 -39 10 -10 15 -415 5 -421 -8 -6 -1670 27
            -2053 40 l-198 7 0 223 0 224 103 -1 c56 0 560 -15 1119 -33z m2828 -91 c421
            -14 766 -25 768 -25 1 0 2 -91 2 -202 l0 -201 -227 6 c-126 4 -500 11 -833 17
            -333 6 -669 13 -747 16 l-143 6 0 211 0 210 208 -7 c114 -3 551 -18 972 -31z"/>
            </g>
          </svg>
          <Typography variant="h6" className={classes.title}>
              SoundDash
          </Typography>
          <h2 className={classes.project}>{props.currentProject}</h2>
          <Menu />
        </Toolbar>
      </AppBar>
    </div>
  );
}