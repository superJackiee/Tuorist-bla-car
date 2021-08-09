import { functions, isEqual, omit } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleAPIKey } from "../http-common";
import { updateTutorialsByTitle } from "../redux/actions/offer";

let directionsRenderer = null;
let directionsService = null;
function Map({
  onRouteChange = null,
  currentRoute = null,
  startId = null,
  endId = null,
  options,
  onMount,
  className,
  onMountProps,
}) {
  const ref = useRef();
  const [map, setMap] = useState();
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const [originPlace, setOriginPlace] = useState(null);
  const [targetPlace, setTargetPlace] = useState(null);
  const [wayPoints, setWayPoints] = useState([]);
  const [wayPointNames, setWayPointNames] = useState([]);
  const [routeIdx, setRouteIdx] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  const tutorials = useSelector((state) => state.offer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tutorials && tutorials.length > 0) {
      tutorials.map((item) => {
        if (item.title === "start") {
          if (window.location.pathname === "/returnroute") {
            setTargetPlace(item.description.value);
          } else setOriginPlace(item.description.value);
        }

        if (item.title === "end") {
          if (window.location.pathname === "/returnroute") {
            setOriginPlace(item.description.value);
          } else setTargetPlace(item.description.value);
        }
        if (item.title === "route") setRouteIdx(item.description + 1);
        if (item.title === "latlngs") {
          if (window.location.pathname === "/viewmap") {
            setWayPoints(item.description);
          } else setWayPoints([]);
        }
        if (item.title === "points") {
          if (window.location.pathname === "/viewmap") {
            setWayPointNames(item.description);
          } else setWayPointNames([]);
        }
        return 0;
      });
    }
  }, [tutorials]);

  function containsWord(string, word) {
    const rulest = "(?:[^.w]|^|^\\W+)";
    const rulen = "(?:[^.w]|\\W(?=\\W+|$)|$)";
    return new RegExp(rulest + word + rulen).test(string);
  }

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    // const selectedMode = document.getElementById("mode").value;
    const needMarker = window.location.pathname === "/viewmap";
    if (needMarker) {
      if (wayPoints && wayPoints.length > 0) {
        wayPoints.map((point, index) => {
          new google.maps.Marker({
            position: point,
            map,
            title: wayPointNames[index].label,
          });
        });
      }
    }
    directionsService.route(
      {
        origin: {
          placeId: originPlace,
        },
        destination: {
          placeId: targetPlace,
        },
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      },
      (response, status) => {
        if (status === "OK") {
          console.log(response);
          directionsRenderer.setDirections(response);
          if (response.routes.length > 0) {
            if (onRouteChange !== null) {
              const routeList = [];
              const routePolyLineList = [];
              const tollList = [];
              for (let i = 0, len = response.routes.length; i < len; i++) {
                let totalTolls = 0;
                routeList.push(response.routes[i].summary);

                const polyline = new window.google.maps.Polyline({
                  path: [],
                  strokeColor: "#0000FF",
                  strokeWeight: 3,
                });
                const bounds = new window.google.maps.LatLngBounds();

                const legs = response.routes[i].legs;
                for (let l = 0; l < legs.length; l++) {
                  const steps = legs[l].steps;
                  for (let j = 0; j < steps.length; j++) {
                    const nextSegment = steps[j].path;
                    for (let k = 0; k < nextSegment.length; k++) {
                      polyline.getPath().push(nextSegment[k]);
                      bounds.extend(nextSegment[k]);
                    }
                    if (
                      containsWord(
                        steps[j].instructions.toLowerCase(),
                        "toll road"
                      )
                    ) {
                      totalTolls += 1;
                    }
                  }
                }

                tollList.push(totalTolls);
                routePolyLineList.push(polyline);
              }

              dispatch(updateTutorialsByTitle("tolls", tollList));
              dispatch(updateTutorialsByTitle("paths", routePolyLineList));
              onRouteChange(routeList, tollList);
              directionsRenderer.setRouteIndex(0);
              setRouteIdx(1);
              dispatch(updateTutorialsByTitle("route", 0));
            }
          }
          if (!calculated) setCalculated(true);
        } else {
          console.log(`Directions request failed due to ${status}`);
        }
      }
    );
  }
  useEffect(() => {
    if (!originPlace || !targetPlace) return;
    if (!directionsRenderer || !directionsService) return;
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  }, [originPlace, targetPlace, loaded]);

  useEffect(() => {
    if (loaded) return;
    if (directionsRenderer && directionsService) setLoaded(true);
  }, [directionsService, directionsRenderer]);

  useEffect(() => {
    if (!calculated || !loaded) return;
    if (routeIdx === 0) return;
    if (directionsRenderer) directionsRenderer.setRouteIndex(routeIdx - 1);
  }, [calculated, routeIdx]);

  useEffect(() => {
    if (currentRoute === null) return;
    const curIdx = parseInt(currentRoute);
    if (curIdx === NaN) return;
    dispatch(updateTutorialsByTitle("route", curIdx));
    setRouteIdx(curIdx + 1);
  }, [currentRoute]);

  useEffect(() => {
    if (startId && endId) {
      setOriginPlace(startId);
      setTargetPlace(endId);
    }
    return () => {};
  }, [startId, endId]);

  useEffect(() => {
    // The Google Maps API modifies the options object passed to
    // the Map constructor in place by adding a mapTypeId with default
    // value 'roadmap'. { ...options } prevents this by creating a copy.
    const onLoad = () => {
      directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsService = new window.google.maps.DirectionsService();
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 },
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      });
      directionsRenderer.setMap(map);
      setMap(map);
    };
    if (!window.google) {
      const script = document.createElement(`script`);
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleAPIKey}`;
      //+ '&callback=initAutocomplete&libraries=places&v=weekly'
      document.head.append(script);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  }, [options]);

  if (map && typeof onMount === `function`) onMount(map, onMountProps);

  return (
    <div id="map" style={styles.mapDiv(matches)} {...{ ref, className }} />
  );
}

function shouldNotUpdate(props, nextProps) {
  const [funcs, nextFuncs] = [functions(props), functions(nextProps)];
  const noPropChange = isEqual(omit(props, funcs), omit(nextProps, nextFuncs));
  const noFuncChange =
    funcs.length === nextFuncs.length &&
    funcs.every((fn) => props[fn].toString() === nextProps[fn].toString());
  return noPropChange && noFuncChange;
}

const styles = {
  mapDiv: (isRowBased) => ({
    height: isRowBased ? "96vh" : "100vh",
    margin: "0",
  }),
  lstRoutes: (isRowBased) => ({
    backgroundColor: "transparent",
    border: "none",
    fontSize: isRowBased ? "1vw" : "2vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    color: "black",
    height: "4em",
    width: "80%",
    textAlign: "left",
  }),
  btnRadio: (isRowBased) => ({
    minWidth: isRowBased ? "2vw" : "4vw",
    minHeight: isRowBased ? "2vw" : "4vw",
    width: isRowBased ? "2vw" : "4vw",
    height: isRowBased ? "2vw" : "4vw",
    backgroundColor: "#00AEEF",
  }),
};

export default React.memo(Map, shouldNotUpdate);

Map.defaultProps = {
  options: {
    center: { lat: 48, lng: 8 },
    zoom: 5,
  },
};
