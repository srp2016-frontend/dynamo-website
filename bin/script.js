///<reference path='state.ts'/>
/**
Bridge between the frontend and backend applications

Handles AJAX requests and caches the results
*/
var Bridge = (function () {
    function Bridge() {
        this.messageCache = [
            JSON.stringify([new Person(40, 40, 'Brian', 'DeLeonardis', 18), new Person(40, 80, 'Jack', 'Dates', 18), new Person(40, 120, 'Anthony', 'Fasano', 18), new Person(40, 160, 'Anthony', 'Hamill', 18), new Person(40, 200, 'Brandon', 'Guglielmo', 18), new Person(40, 240, 'Chase', 'Moran', 18), new Person(40, 280, 'Daniel', 'Collins', 18), new Person(40, 320, 'Kevin', 'DeStefano', 18), new Person(40, 360, 'Matthew', 'Kumar', 18), new Person(40, 400, 'Ryan', 'Goldstein', 18), new Person(40, 440, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(74.99221452113018, 40.738188937336616, 'Brian', 'DeLeonardis', 18), new Person(78.9921637412827, 80.78177156062297, 'Jack', 'Dates', 18), new Person(65.9953217838428, 120.49319910225766, 'Anthony', 'Fasano', 18), new Person(67.98413758218956, 159.05763925109008, 'Anthony', 'Hamill', 18), new Person(74.96224673215511, 201.6252087373348, 'Brandon', 'Guglielmo', 18), new Person(74.96870635290733, 238.5202784031656, 'Chase', 'Moran', 18), new Person(72.99678602144297, 279.5394435375493, 'Daniel', 'Collins', 18), new Person(66.99899720195897, 320.23270171596124, 'Kevin', 'DeStefano', 18), new Person(79.97383065354217, 361.4466730390564, 'Matthew', 'Kumar', 18), new Person(65.99365757285139, 400.5742525449189, 'Ryan', 'Goldstein', 18), new Person(79.99989225026785, 439.90715622281215, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(109.98442904226036, 41.47637787467323, 'Brian', 'DeLeonardis', 18), new Person(117.98432748256539, 81.56354312124594, 'Jack', 'Dates', 18), new Person(91.9906435676856, 120.98639820451533, 'Anthony', 'Fasano', 18), new Person(95.96827516437912, 158.11527850218016, 'Anthony', 'Hamill', 18), new Person(109.92449346431022, 203.25041747466958, 'Brandon', 'Guglielmo', 18), new Person(109.93741270581467, 237.0405568063312, 'Chase', 'Moran', 18), new Person(105.99357204288594, 279.0788870750986, 'Daniel', 'Collins', 18), new Person(93.99799440391794, 320.4654034319225, 'Kevin', 'DeStefano', 18), new Person(119.94766130708433, 362.8933460781128, 'Matthew', 'Kumar', 18), new Person(91.98731514570278, 401.14850508983784, 'Ryan', 'Goldstein', 18), new Person(119.9997845005357, 439.8143124456243, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(144.97664356339055, 42.21456681200985, 'Brian', 'DeLeonardis', 18), new Person(156.9764912238481, 82.34531468186891, 'Jack', 'Dates', 18), new Person(117.98596535152839, 121.47959730677299, 'Anthony', 'Fasano', 18), new Person(123.95241274656868, 157.17291775327024, 'Anthony', 'Hamill', 18), new Person(144.88674019646533, 204.87562621200436, 'Brandon', 'Guglielmo', 18), new Person(144.906119058722, 235.56083520949682, 'Chase', 'Moran', 18), new Person(138.99035806432892, 278.61833061264787, 'Daniel', 'Collins', 18), new Person(120.99699160587691, 320.6981051478837, 'Kevin', 'DeStefano', 18), new Person(159.9214919606265, 364.3400191171692, 'Matthew', 'Kumar', 18), new Person(117.98097271855417, 401.72275763475676, 'Ryan', 'Goldstein', 18), new Person(159.99967675080353, 439.72146866843644, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(179.96885808452072, 42.952755749346466, 'Brian', 'DeLeonardis', 18), new Person(195.96865496513078, 83.12708624249188, 'Jack', 'Dates', 18), new Person(143.9812871353712, 121.97279640903065, 'Anthony', 'Fasano', 18), new Person(151.93655032875824, 156.23055700436032, 'Anthony', 'Hamill', 18), new Person(179.84898692862043, 206.50083494933915, 'Brandon', 'Guglielmo', 18), new Person(179.87482541162933, 234.08111361266242, 'Chase', 'Moran', 18), new Person(171.9871440857719, 278.15777415019716, 'Daniel', 'Collins', 18), new Person(147.9959888078359, 320.93080686384496, 'Kevin', 'DeStefano', 18), new Person(199.89532261416866, 365.7866921562256, 'Matthew', 'Kumar', 18), new Person(143.97463029140556, 402.2970101796757, 'Ryan', 'Goldstein', 18), new Person(199.9995690010714, 439.6286248912486, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(214.96107260565088, 43.69094468668308, 'Brian', 'DeLeonardis', 18), new Person(234.96081870641348, 83.90885780311486, 'Jack', 'Dates', 18), new Person(169.976608919214, 122.46599551128831, 'Anthony', 'Fasano', 18), new Person(179.9206879109478, 155.2881962554504, 'Anthony', 'Hamill', 18), new Person(214.81123366077554, 208.12604368667394, 'Brandon', 'Guglielmo', 18), new Person(214.84353176453666, 232.60139201582803, 'Chase', 'Moran', 18), new Person(204.98393010721486, 277.69721768774644, 'Daniel', 'Collins', 18), new Person(174.99498600979487, 321.1635085798062, 'Kevin', 'DeStefano', 18), new Person(239.86915326771083, 367.23336519528203, 'Matthew', 'Kumar', 18), new Person(169.96828786425695, 402.8712627245946, 'Ryan', 'Goldstein', 18), new Person(239.99946125133926, 439.53578111406074, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(249.95328712678105, 44.4291336240197, 'Brian', 'DeLeonardis', 18), new Person(273.9529824476962, 84.69062936373783, 'Jack', 'Dates', 18), new Person(195.97193070305678, 122.95919461354598, 'Anthony', 'Fasano', 18), new Person(207.90482549313737, 154.34583550654048, 'Anthony', 'Hamill', 18), new Person(249.77348039293065, 209.75125242400873, 'Brandon', 'Guglielmo', 18), new Person(249.812238117444, 231.12167041899363, 'Chase', 'Moran', 18), new Person(237.98071612865783, 277.23666122529573, 'Daniel', 'Collins', 18), new Person(201.99398321175386, 321.39621029576745, 'Kevin', 'DeStefano', 18), new Person(279.842983921253, 368.68003823433844, 'Matthew', 'Kumar', 18), new Person(195.96194543710834, 403.4455152695135, 'Ryan', 'Goldstein', 18), new Person(279.9993535016071, 439.4429373368729, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(284.9455016479112, 45.167322561356315, 'Brian', 'DeLeonardis', 18), new Person(312.94514618897887, 85.4724009243608, 'Jack', 'Dates', 18), new Person(221.96725248689958, 123.45239371580364, 'Anthony', 'Fasano', 18), new Person(235.88896307532693, 153.40347475763056, 'Anthony', 'Hamill', 18), new Person(284.73572712508576, 211.3764611613435, 'Brandon', 'Guglielmo', 18), new Person(284.7809444703513, 229.64194882215924, 'Chase', 'Moran', 18), new Person(270.9775021501008, 276.776104762845, 'Daniel', 'Collins', 18), new Person(228.99298041371284, 321.6289120117287, 'Kevin', 'DeStefano', 18), new Person(319.81681457479516, 370.12671127339485, 'Matthew', 'Kumar', 18), new Person(221.95560300995973, 404.01976781443244, 'Ryan', 'Goldstein', 18), new Person(319.999245751875, 439.35009355968504, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(319.9377161690414, 45.90551149869293, 'Brian', 'DeLeonardis', 18), new Person(351.93730993026156, 86.25417248498377, 'Jack', 'Dates', 18), new Person(247.96257427074238, 123.9455928180613, 'Anthony', 'Fasano', 18), new Person(263.8731006575165, 152.46111400872064, 'Anthony', 'Hamill', 18), new Person(319.69797385724087, 213.0016698986783, 'Brandon', 'Guglielmo', 18), new Person(319.74965082325866, 228.16222722532484, 'Chase', 'Moran', 18), new Person(303.9742881715438, 276.3155483003943, 'Daniel', 'Collins', 18), new Person(255.99197761567183, 321.8616137276899, 'Kevin', 'DeStefano', 18), new Person(359.7906452283373, 371.57338431245125, 'Matthew', 'Kumar', 18), new Person(247.94926058281112, 404.59402035935136, 'Ryan', 'Goldstein', 18), new Person(359.99913800214284, 439.2572497824972, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(354.92993069017155, 46.64370043602955, 'Brian', 'DeLeonardis', 18), new Person(390.92947367154426, 87.03594404560674, 'Jack', 'Dates', 18), new Person(273.9578960545852, 124.43879192031896, 'Anthony', 'Fasano', 18), new Person(291.857238239706, 151.51875325981072, 'Anthony', 'Hamill', 18), new Person(354.660220589396, 214.6268786360131, 'Brandon', 'Guglielmo', 18), new Person(354.718357176166, 226.68250562849045, 'Chase', 'Moran', 18), new Person(336.97107419298675, 275.8549918379436, 'Daniel', 'Collins', 18), new Person(282.9909748176308, 322.09431544365117, 'Kevin', 'DeStefano', 18), new Person(399.7644758818795, 373.02005735150766, 'Matthew', 'Kumar', 18), new Person(273.9429181556625, 405.1682729042703, 'Ryan', 'Goldstein', 18), new Person(399.9990302524107, 439.16440600530933, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(389.9221452113017, 47.381889373366164, 'Brian', 'DeLeonardis', 18), new Person(429.92163741282695, 87.81771560622971, 'Jack', 'Dates', 18), new Person(299.95321783842803, 124.93199102257663, 'Anthony', 'Fasano', 18), new Person(319.84137582189555, 150.5763925109008, 'Anthony', 'Hamill', 18), new Person(389.6224673215511, 216.25208737334788, 'Brandon', 'Guglielmo', 18), new Person(389.6870635290734, 225.20278403165605, 'Chase', 'Moran', 18), new Person(369.9678602144297, 275.3944353754929, 'Daniel', 'Collins', 18), new Person(309.98997201958974, 322.3270171596124, 'Kevin', 'DeStefano', 18), new Person(439.73830653542166, 374.46673039056407, 'Matthew', 'Kumar', 18), new Person(299.93657572851384, 405.7425254491892, 'Ryan', 'Goldstein', 18), new Person(439.99892250267857, 439.0715622281215, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(424.9143597324319, 48.12007831070278, 'Brian', 'DeLeonardis', 18), new Person(468.91380115410965, 88.59948716685268, 'Jack', 'Dates', 18), new Person(325.94853962227086, 125.42519012483429, 'Anthony', 'Fasano', 18), new Person(347.8255134040851, 149.63403176199088, 'Anthony', 'Hamill', 18), new Person(424.5847140537062, 217.87729611068266, 'Brandon', 'Guglielmo', 18), new Person(424.65576988198075, 223.72306243482166, 'Chase', 'Moran', 18), new Person(402.9646462358727, 274.9338789130422, 'Daniel', 'Collins', 18), new Person(336.9889692215487, 322.55971887557365, 'Kevin', 'DeStefano', 18), new Person(479.7121371889638, 375.9134034296205, 'Matthew', 'Kumar', 18), new Person(325.9302333013652, 406.3167779941081, 'Ryan', 'Goldstein', 18), new Person(479.99881475294643, 438.9787184509336, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(459.90657425356204, 48.8582672480394, 'Brian', 'DeLeonardis', 18), new Person(507.90596489539234, 89.38125872747565, 'Jack', 'Dates', 18), new Person(351.9438614061137, 125.91838922709195, 'Anthony', 'Fasano', 18), new Person(375.8096509862746, 148.69167101308096, 'Anthony', 'Hamill', 18), new Person(459.5469607858613, 219.50250484801745, 'Brandon', 'Guglielmo', 18), new Person(459.6244762348881, 222.24334083798726, 'Chase', 'Moran', 18), new Person(435.96143225731566, 274.47332245059147, 'Daniel', 'Collins', 18), new Person(363.98796642350766, 322.7924205915349, 'Kevin', 'DeStefano', 18), new Person(519.685967842506, 377.3600764686769, 'Matthew', 'Kumar', 18), new Person(351.92389087421657, 406.89103053902704, 'Ryan', 'Goldstein', 18), new Person(519.9987070032142, 438.8858746737458, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(494.8987887746922, 49.59645618537601, 'Brian', 'DeLeonardis', 18), new Person(546.898128636675, 90.16303028809862, 'Jack', 'Dates', 18), new Person(377.9391831899565, 126.41158832934961, 'Anthony', 'Fasano', 18), new Person(403.79378856846415, 147.74931026417104, 'Anthony', 'Hamill', 18), new Person(494.5092075180164, 221.12771358535224, 'Brandon', 'Guglielmo', 18), new Person(494.59318258779547, 220.76361924115287, 'Chase', 'Moran', 18), new Person(468.95821827875864, 274.01276598814076, 'Daniel', 'Collins', 18), new Person(390.9869636254666, 323.02512230749613, 'Kevin', 'DeStefano', 18), new Person(559.6597984960481, 378.8067495077333, 'Matthew', 'Kumar', 18), new Person(377.91754844706793, 407.46528308394596, 'Ryan', 'Goldstein', 18), new Person(559.9985992534821, 438.7930308965579, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(529.8910032958224, 50.33464512271263, 'Brian', 'DeLeonardis', 18), new Person(585.8902923779576, 90.9448018487216, 'Jack', 'Dates', 18), new Person(403.93450497379933, 126.90478743160728, 'Anthony', 'Fasano', 18), new Person(431.7779261506537, 146.80694951526112, 'Anthony', 'Hamill', 18), new Person(529.4714542501715, 222.75292232268703, 'Brandon', 'Guglielmo', 18), new Person(529.5618889407028, 219.28389764431847, 'Chase', 'Moran', 18), new Person(501.9550043002016, 273.55220952569005, 'Daniel', 'Collins', 18), new Person(417.9859608274256, 323.2578240234574, 'Kevin', 'DeStefano', 18), new Person(599.6336291495902, 380.2534225467897, 'Matthew', 'Kumar', 18), new Person(403.9112060199193, 408.0395356288649, 'Ryan', 'Goldstein', 18), new Person(599.99849150375, 438.70018711937007, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(564.8832178169527, 51.072834060049246, 'Brian', 'DeLeonardis', 18), new Person(624.8824561192403, 91.72657340934457, 'Jack', 'Dates', 18), new Person(429.92982675764216, 127.39798653386494, 'Anthony', 'Fasano', 18), new Person(459.7620637328432, 145.8645887663512, 'Anthony', 'Hamill', 18), new Person(564.4337009823266, 224.37813106002181, 'Brandon', 'Guglielmo', 18), new Person(564.5305952936102, 217.80417604748408, 'Chase', 'Moran', 18), new Person(534.9517903216446, 273.09165306323933, 'Daniel', 'Collins', 18), new Person(444.98495802938453, 323.4905257394186, 'Kevin', 'DeStefano', 18), new Person(639.6074598031323, 381.7000955858461, 'Matthew', 'Kumar', 18), new Person(429.90486359277065, 408.6137881737838, 'Ryan', 'Goldstein', 18), new Person(639.9983837540178, 438.6073433421822, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(599.8754323380829, 51.81102299738586, 'Brian', 'DeLeonardis', 18), new Person(663.8746198605229, 92.50834496996754, 'Jack', 'Dates', 18), new Person(455.925148541485, 127.8911856361226, 'Anthony', 'Fasano', 18), new Person(487.74620131503275, 144.92222801744128, 'Anthony', 'Hamill', 18), new Person(599.3959477144817, 226.0033397973566, 'Brandon', 'Guglielmo', 18), new Person(599.4993016465176, 216.32445445064968, 'Chase', 'Moran', 18), new Person(567.9485763430876, 272.6310966007886, 'Daniel', 'Collins', 18), new Person(471.9839552313435, 323.72322745537986, 'Kevin', 'DeStefano', 18), new Person(679.5812904566744, 383.1467686249025, 'Matthew', 'Kumar', 18), new Person(455.898521165622, 409.1880407187027, 'Ryan', 'Goldstein', 18), new Person(679.9982760042857, 438.51449956499437, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(634.8676468592131, 52.54921193472248, 'Brian', 'DeLeonardis', 18), new Person(702.8667836018055, 93.29011653059051, 'Jack', 'Dates', 18), new Person(481.9204703253278, 128.38438473838025, 'Anthony', 'Fasano', 18), new Person(515.7303388972223, 143.97986726853136, 'Anthony', 'Hamill', 18), new Person(634.3581944466368, 227.6285485346914, 'Brandon', 'Guglielmo', 18), new Person(634.4680079994249, 214.8447328538153, 'Chase', 'Moran', 18), new Person(600.9453623645305, 272.1705401383379, 'Daniel', 'Collins', 18), new Person(498.98295243330244, 323.9559291713411, 'Kevin', 'DeStefano', 18), new Person(719.5551211102165, 384.5934416639589, 'Matthew', 'Kumar', 18), new Person(481.8921787384734, 409.76229326362164, 'Ryan', 'Goldstein', 18), new Person(719.9981682545535, 438.4216557878065, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(669.8598613803433, 53.287400872059095, 'Brian', 'DeLeonardis', 18), new Person(741.8589473430882, 94.07188809121348, 'Jack', 'Dates', 18), new Person(507.91579210917064, 128.8775838406379, 'Anthony', 'Fasano', 18), new Person(543.7144764794118, 143.03750651962145, 'Anthony', 'Hamill', 18), new Person(669.320441178792, 229.25375727202618, 'Brandon', 'Guglielmo', 18), new Person(669.4367143523323, 213.3650112569809, 'Chase', 'Moran', 18), new Person(633.9421483859735, 271.7099836758872, 'Daniel', 'Collins', 18), new Person(525.9819496352615, 324.18863088730234, 'Kevin', 'DeStefano', 18), new Person(759.5289517637586, 386.0401147030153, 'Matthew', 'Kumar', 18), new Person(507.88583631132474, 410.33654580854056, 'Ryan', 'Goldstein', 18), new Person(759.9980605048214, 438.32881201061866, 'Tina', 'Lu', 18),]),
            JSON.stringify([new Person(704.8520759014735, 54.02558980939571, 'Brian', 'DeLeonardis', 18), new Person(780.8511110843708, 94.85365965183645, 'Jack', 'Dates', 18), new Person(533.9111138930134, 129.37078294289554, 'Anthony', 'Fasano', 18), new Person(571.6986140616013, 142.09514577071153, 'Anthony', 'Hamill', 18), new Person(704.2826879109471, 230.87896600936097, 'Brandon', 'Guglielmo', 18), new Person(704.4054207052396, 211.8852896601465, 'Chase', 'Moran', 18), new Person(666.9389344074165, 271.2494272134365, 'Daniel', 'Collins', 18), new Person(552.9809468372205, 324.4213326032636, 'Kevin', 'DeStefano', 18), new Person(799.5027824173008, 387.4867877420717, 'Matthew', 'Kumar', 18), new Person(533.8794938841761, 410.9107983534595, 'Ryan', 'Goldstein', 18), new Person(799.9979527550893, 438.2359682334308, 'Tina', 'Lu', 18),]),];
    }
    /**
    * Takes a message from the cache or the server and makes it into a State object
    * Asynchronous because it may make an AJAX request
    */
    Bridge.prototype.tick = function (state, action) {
        if (action === void 0) { action = null; }
        this.doWithMessage(function (message) {
            state.people = JSON.parse(message);
            state.updateSelected();
            if (action)
                action();
        });
    };
    Bridge.prototype.doWithMessage = function (callback) {
        if (this.messageCache.length > 0) {
            callback(this.messageCache.shift());
        }
        else {
        }
    };
    return Bridge;
}());
///<reference path='state.ts'/>
///<reference path='communication.ts'/>
var maxTicks = 100;
function pause(button, time) {
    var pause = button.innerHTML === "Pause";
    button.innerHTML = pause ? "Resume" : "Pause";
    time.paused = pause;
}
var TimeManager = (function () {
    function TimeManager(bridge, ctx, state, next, pause) {
        this.bridge = bridge;
        this.frames = [];
        this.ticks = 0;
        this.paused = false;
        this.ctx = ctx;
        this.currentFrame = 0;
        this.state = state;
        this.queued = next;
        this.next = new State(this.state.people);
        this.isCurrent = true;
        this.pauseButton = pause;
        this.setupEvents();
    }
    TimeManager.prototype.getFrame = function (index) {
        return JSON.parse(JSON.stringify(this.frames[index]));
    };
    TimeManager.prototype.updateFrame = function () {
        if (!this.paused) {
            if (this.isCurrent) {
                this.ticks += 1;
                this.queued.copySelection(this.state);
                if (this.ticks == 100) {
                    this.bridge.tick(this.queued);
                    this.frames.push(JSON.parse(JSON.stringify(this.state.people)));
                    this.ticks = 0;
                }
                this.state.update(this.queued, this.ticks, maxTicks);
                this.state.draw(this.ctx);
            }
            else {
                this.ticks += 1;
                this.next.copySelection(this.state);
                if (this.ticks == 100) {
                    this.moveStateForward();
                }
                this.state.update(this.next, this.ticks, maxTicks);
                this.state.draw(this.ctx);
            }
        }
    };
    TimeManager.prototype.setStateToCurrent = function () {
        this.ticks = 0;
        this.currentFrame = this.frames.length - 1;
        this.state.people = this.getFrame(this.currentFrame);
        this.state.updateSelected();
        this.isCurrent = true;
    };
    TimeManager.prototype.moveStateBack = function () {
        if (this.currentFrame == 0)
            return;
        this.ticks = 0;
        this.currentFrame--;
        this.state.people = this.getFrame(this.currentFrame);
        this.state.updateSelected();
        if (this.currentFrame < this.frames.length - 1) {
            this.next.people = this.getFrame(this.currentFrame + 1);
            this.next.updateSelected();
        }
        this.isCurrent = false;
        if (!this.paused)
            pause(this.pauseButton, this);
    };
    TimeManager.prototype.moveStateForward = function () {
        var _this = this;
        if (this.currentFrame == this.frames.length - 1)
            return;
        this.ticks = 0;
        this.currentFrame++;
        this.state.people = this.getFrame(this.currentFrame);
        this.state.updateSelected();
        if (this.currentFrame < this.frames.length - 1) {
            this.next.people = this.getFrame(this.currentFrame + 1);
            this.next.updateSelected();
            this.isCurrent = false;
            if (!this.paused)
                pause(this.pauseButton, this);
        }
        else {
            this.isCurrent = true;
            this.bridge.tick(this.queued, function () { return _this.frames.push(_this.state.people); });
        }
    };
    TimeManager.prototype.setStateToFirst = function () {
        this.currentFrame = 0;
        this.ticks = 0;
        this.state.people = this.getFrame(this.currentFrame);
        this.state.updateSelected();
        if (this.currentFrame < this.frames.length - 1) {
            this.next.people = this.getFrame(this.currentFrame + 1);
            this.next.updateSelected();
        }
        this.isCurrent = false;
        if (!this.paused)
            pause(this.pauseButton, this);
    };
    TimeManager.prototype.getPersonInPast = function (person, timeBack) {
        if (this.frames.length > 0) {
            var cFrame = this.currentFrame;
            if (this.isCurrent)
                cFrame = this.frames.length - 1;
            var frame = Math.max(cFrame - timeBack, 0);
            var temp = new State(this.frames[frame]);
            return temp.getPersonByName(person.fName + " " + person.lName);
        }
        else {
            return person;
        }
    };
    TimeManager.prototype.setupEvents = function () {
        var timeManager = this;
        var state = this.state;
        var ctx = this.ctx;
        $("#back-to-start").click(function (e) {
            timeManager.setStateToFirst();
            state.draw(ctx);
        });
        $("#back-one").click(function (e) {
            timeManager.moveStateBack();
            state.draw(ctx);
        });
        $("#forward-one").click(function (e) {
            timeManager.moveStateForward();
            state.draw(ctx);
        });
        $("#forward-to-now").click(function (e) {
            timeManager.setStateToCurrent();
            state.draw(ctx);
        });
        $('#pause').click(function (e) {
            pause(this, timeManager);
        });
    };
    return TimeManager;
}());
///<reference path='jquery.d.ts'/>
/// <reference path="time.ts" />
var Person = (function () {
    function Person(x, y, fName, lName, age) {
        this.x = x;
        this.y = y;
        this.fName = fName;
        this.lName = lName;
        this.age = age;
    }
    return Person;
}());
var radius = 6;
var radiusSquared = radius * radius;
var State = (function () {
    function State(people) {
        this.people = people;
        this.selected = [];
    }
    State.prototype.draw = function (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.lineWidth = 2;
        var left = this.people[0].x - radius;
        var top = this.people[0].y - radius;
        var right = left;
        var bottom = top;
        for (var _i = 0, _a = this.people; _i < _a.length; _i++) {
            var person = _a[_i];
            if (person.x - radius < left)
                left = person.x - radius;
            if (person.x + radius > right)
                right = person.x + radius;
            if (person.y - radius < top)
                top = person.y - radius;
            if (person.y - radius > bottom)
                bottom = person.y + radius;
        }
        for (var _b = 0, _c = this.people; _b < _c.length; _b++) {
            var person = _c[_b];
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.strokeStyle = "blue";
            ctx.globalAlpha = 0.25;
            if (this.selected.indexOf(person) != -1 || this.selected.length === 0)
                ctx.globalAlpha = 1.0;
            var x = person.x; // - left;
            var y = person.y; // - top;
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x, y);
            for (var i = 1; i < 10; i++) {
                var previous = this.time.getPersonInPast(person, i);
                ctx.lineTo(previous.x /*- left*/, previous.y /*- top*/);
            }
            ctx.stroke();
        }
    };
    State.prototype.update = function (next, ticks, maxTicks) {
        for (var _i = 0, _a = this.people; _i < _a.length; _i++) {
            var person = _a[_i];
            var equivalent = next.getPersonByName(person.fName + " " + person.lName);
            person.x = this.scaleByTime(person.x, equivalent.x, ticks, maxTicks);
            person.y = this.scaleByTime(person.y, equivalent.y, ticks, maxTicks);
        }
    };
    State.prototype.scaleByTime = function (current, goal, ticks, maxTicks) {
        return current + (goal - current) / (maxTicks - ticks);
    };
    State.prototype.getPersonAt = function (x, y) {
        for (var _i = 0, _a = this.people; _i < _a.length; _i++) {
            var person = _a[_i];
            var dstX = x - person.x;
            var dstY = y - person.y;
            if (Math.pow(dstX, 2) + Math.pow(dstY, 2) <= radiusSquared)
                return person;
        }
        return null;
    };
    State.prototype.getPersonByName = function (name) {
        for (var _i = 0, _a = this.people; _i < _a.length; _i++) {
            var person = _a[_i];
            if (person.fName + " " + person.lName === name) {
                return person;
            }
        }
        return null;
    };
    State.prototype.updateSelected = function () {
        for (var i = 0; i < this.people.length; i++) {
            for (var j = 0; j < this.selected.length; j++) {
                var person = this.people[i];
                var selection = this.selected[j];
                if (selection.lName === person.lName && selection.fName === person.fName && selection.age === person.age)
                    this.selected[j] = person;
            }
        }
    };
    State.prototype.setSelection = function (selection) {
        if (selection) {
            this.selected.length = 1;
            this.selected[0] = selection;
        }
        else
            this.selected.length = 0;
        this.updateDisplay();
    };
    State.prototype.setSelections = function (selection) {
        this.selected.length = selection.length;
        for (var i = 0; i < selection.length; i++)
            this.selected[i] = selection[i];
    };
    State.prototype.addSelection = function (selection) {
        if (selection) {
            var index = this.selected.indexOf(selection);
            if (index == -1)
                this.selected.push(selection);
            else
                this.selected.splice(index, 1);
            this.updateDisplay();
        }
    };
    State.prototype.setDisplay = function (display) {
        if (display) {
            $("#sidebar").empty();
            this.appendToDisplay(display);
        }
        else
            $("#sidebar").empty();
    };
    State.prototype.updateDisplay = function () {
        $("#sidebar").empty();
        for (var _i = 0, _a = this.selected; _i < _a.length; _i++) {
            var person = _a[_i];
            this.appendToDisplay(person);
        }
        this.getRoster();
    };
    State.prototype.appendToDisplay = function (person) {
        $("#sidebar").append("<b>First Name: </b>", person.fName, "<br>");
        $("#sidebar").append("<b>Last Name:  </b>", person.lName, "<br>");
        $("#sidebar").append("<b>Age: </b>", person.age, "<br>");
        $("#sidebar").append("<hr style='width:100%;height:1px;'/>");
    };
    State.prototype.hasSelection = function () {
        return this.selected.length > 0;
    };
    State.prototype.copySelection = function (other) {
        this.selected.length = other.selected.length;
        for (var i = 0; i < this.selected.length; i++)
            this.selected[i] = other.selected[i];
    };
    State.prototype.getRoster = function () {
        var names;
        var results = $('#rSidebar');
        results.empty();
        names = this.pSearch(" ");
        names.sort();
        var state = this;
        function generateButton(name) {
            var className = "manifest-name";
            if (state.selected.length > 0 && state.selected.indexOf(state.getPersonByName(name)) == -1)
                className += "-deselected";
            var r = $('<input type="button" class = "' + className + '" value ="' + name + '"/>');
            r.click(function (e) {
                var person = state.getPersonByName(r.val());
                if (e.shiftKey)
                    state.addSelection(person);
                else
                    state.setSelection(person);
            });
            results.append(r);
            results.append("<br>");
        }
        for (var i = 0; i < names.length; i++) {
            generateButton(names[i]);
        }
    };
    return State;
}());
/// <reference path="state.ts" />
function setClickEvents(canvas, ctx, state) {
    canvas.onmousedown = function (e) {
        if (e.shiftKey)
            state.addSelection(state.getPersonAt(e.offsetX, e.offsetY));
        else
            state.setSelection(state.getPersonAt(e.offsetX, e.offsetY));
        state.draw(ctx);
    };
    canvas.onmousemove = function (e) {
        if (!state.hasSelection()) {
            state.setDisplay(state.getPersonAt(e.offsetX, e.offsetY));
            state.draw(ctx);
        }
    };
}
/// <reference path="state.ts" />
/// <reference path="jquery.d.ts" />
function setSearchEvents(state, ctx) {
    var input = $('#searchbar')[0];
    var count = 0;
    var items = [];
    function search() {
        var people = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            people.push(state.getPersonByName(item));
        }
        state.setSelections(people);
        $("#not-found").css("visibility", state.hasSelection() ? "hidden" : "visible");
        state.draw(ctx);
    }
    function setSearchItems(is) {
        var results = $("#search-results");
        items = is;
        if (items.length == 0) {
            results.html("");
            results.css("border", "0px");
        }
        else {
            count = 0;
            results.html("");
            for (var i = 0; i < items.length; i++) {
                if (i == count) {
                    var r = $('<input type="button" class = "sel" onclick="autocomplete_button_onclick(this)" value="' + items[i] + '"/>');
                    results.append(r);
                    results.append("<br>");
                }
                else {
                    var r = $('<input type="button" class = "poss" onclick="autocomplete_button_onclick(this)" value="' + items[i] + '"/>');
                    results.append(r);
                    results.append("<br>");
                }
            }
            results.css("border", "1px solid #A5ACB2");
        }
        search();
    }
    function pSearch(check) {
        if (check.length < 1)
            return [];
        var possible = [];
        for (var i = 0; i < state.people.length; i++) {
            var name = state.people[i].fName + " " + state.people[i].lName;
            if (name.toLowerCase().indexOf(check.toLowerCase()) >= 0) {
                possible.push(name);
            }
        }
        return possible;
    }
    $('#searchbutton').click(function (e) {
        search();
    });
    function autocomplete_button_onclick(button) {
        var results = $("#search-results");
        results.html("");
        results.css("border", "0px");
        input.value = button.value;
        search();
    }
    $('#searchbar').on("input", function (e) {
        var str = input.value;
        setSearchItems(pSearch(str));
        if (str.length === 0)
            $("#not-found").css("visibility", "hidden");
    });
    $("#searchbar:input").bind('keyup change click', function (ev) {
        var e = ev;
        var results = $("#search-results");
        if (e.keyCode === 13) {
            $("#searchbar").val(items[count]);
            search();
            results.html("");
        }
        else if (e.keyCode === 38 || e.keyCode === 40) {
            if (e.keyCode === 38 && count > 0)
                count--;
            else if (e.keyCode === 40 && count < items.length - 1)
                count++;
            results.html("");
            for (var i = 0; i < items.length; i++) {
                if (i == count) {
                    var r = $('<input type="button" class = "sel" onclick="autocomplete_button_onclick(this)" value="' + items[i] + '"/>');
                    results.append(r);
                    results.append("<br>");
                }
                else {
                    var r = $('<input type="button" class = "poss" onclick="autocomplete_button_onclick(this)" value="' + items[i] + '"/>');
                    results.append(r);
                    results.append("<br>");
                }
            }
        }
    });
    return pSearch;
}
/// <reference path='state.ts'/>
/// <reference path='communication.ts'/>
/// <reference path='time.ts'/>
/// <reference path="click_events.ts" />
/// <reference path="search.ts" />
function main() {
    var canvas = $('#position-feed')[0];
    var ctx = canvas.getContext('2d');
    var state = new State([new Person(40, 40, 'Brian', 'DeLeonardis', 18), new Person(40, 80, 'Jack', 'Dates', 18), new Person(40, 120, 'Anthony', 'Fasano', 18), new Person(40, 160, 'Anthony', 'Hamill', 18), new Person(40, 200, 'Brandon', 'Guglielmo', 18), new Person(40, 240, 'Chase', 'Moran', 18), new Person(40, 280, 'Daniel', 'Collins', 18), new Person(40, 320, 'Kevin', 'DeStefano', 18), new Person(40, 360, 'Matthew', 'Kumar', 18), new Person(40, 400, 'Ryan', 'Goldstein', 18), new Person(40, 440, 'Tina', 'Lu', 18),]);
    var bridge = new Bridge();
    var items;
    var count = 0;
    var next = new State(state.people);
    var timeManager = new TimeManager(bridge, ctx, state, next, $("#pause")[0]);
    state.pSearch = setSearchEvents(state, ctx);
    state.time = timeManager;
    state.draw(ctx);
    setInterval(function () {
        timeManager.updateFrame();
    }, 10);
    setClickEvents(canvas, ctx, state);
    state.getRoster();
}
main();
