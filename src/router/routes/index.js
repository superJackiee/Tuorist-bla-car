import { lazy } from "react";

const Title = "Pharao´s world";

const DefaultRoute = "/home";

const Routes = [
  {
    path: "/home",
    // component: lazy(() => import("../../views/Home")),
    component: lazy(() => import("../../views/FindRide/FindRideMain")),
  },
  {
    path: "/findpickuptime",
    component: lazy(() => import("../../views/FindRide/PickupTime")),
  },
  {
    path: "/ridesort",
    component: lazy(() => import("../../views/FindRide/RideSort")),
  },
  {
    path: "/ridefilter",
    component: lazy(() => import("../../views/FindRide/RideFilter")),
  },
  {
    path: "/ridecontact",
    component: lazy(() => import("../../views/FindRide/RideContact")),
  },
  {
    path: "/findonmap",
    component: lazy(() => import("../../views/FindRide/ViewMap")),
  },
  {
    path: "/sign",
    component: lazy(() => import("../../views/FindRide/Sign")),
  },
  {
    path: "/tourist",
    component: lazy(() => import("../../views/TouristPackage/Tourist")),
  },
  {
    path: "/request",
    component: lazy(() => import("../../views/TouristPackage/Request")),
  },
  {
    path: "/sundarban",
    component: lazy(() => import("../../views/TouristPackage/Sundarban")),
  },
  {
    path: "/ranthambare",
    component: lazy(() => import("../../views/TouristPackage/Ranthambare")),
  },
  {
    path: "/payment",
    component: lazy(() => import("../../views/TouristPackage/Payment")),
  },
  {
    path: "/offeride",
    component: lazy(() => import("../../views/OfferRide/MapRoute")),
  },
  {
    path: "/boost",
    component: lazy(() => import("../../views/OfferRide/Boost")),
  },
  {
    path: "/addwaypoint",
    component: lazy(() => import("../../views/OfferRide/AddWayPoint")),
  },
  {
    path: "/viewmap",
    component: lazy(() => import("../../views/OfferRide/ViewMap")),
  },
  {
    path: "/pickuptime",
    component: lazy(() => import("../../views/OfferRide/PickupTime")),
  },
  {
    path: "/returnpickuptime",
    component: lazy(() => import("../../views/OfferRide/ReturnPickupTime")),
  },
  {
    path: "/passengers",
    component: lazy(() => import("../../views/OfferRide/Passengers")),
  },
  {
    path: "/priceperseat",
    component: lazy(() => import("../../views/OfferRide/PricePerSeat")),
  },
  {
    path: "/comeback",
    component: lazy(() => import("../../views/OfferRide/ComeBack")),
  },
  {
    path: "/anyother",
    component: lazy(() => import("../../views/OfferRide/AnyOther")),
  },
  {
    path: "/returnroute",
    component: lazy(() => import("../../views/OfferRide/ReturnRoute")),
  },
  {
    path: "/findride",
    component: lazy(() => import("../../views/FindRide/FindRideMain")),
  },
  {
    path: "/ridelist",
    component: lazy(() => import("../../views/FindRide/RideList")),
  },
  {
    path: "/ridequote",
    component: lazy(() => import("../../views/FindRide/RideQuote")),
  },
  {
    path: "/rideverify",
    component: lazy(() => import("../../views/FindRide/RideVerify")),
  },
];

export { DefaultRoute, Title, Routes };
