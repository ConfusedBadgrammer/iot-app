"use client";

import { useState, useEffect } from "react";
import { Card, CardTitle, CardBody } from "@/components/Card";
import ProgressBar from "@/components/ProgressBar";
import SubNav from "@/components/SubNav";
import { Droplet, Thermometer } from "lucide-react";
import { calcDewPoint } from "@/lib/utils";

const devices = [
  { mac: "88:57:21:95:51:F8", label: "Bedroom" },
  { mac: "10:06:1C:F6:6E:60", label: "Kitchen" },
];

export default function Climate() {
  const [selectedMac, setSelectedMac] = useState(devices[0].mac);
  const [sensorData, setSensorData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [oneHrSensorData, setOneHrSensorData] = useState(null);
  const dewPoint = sensorData
    ? calcDewPoint(sensorData.temperature, sensorData.humidity)
    : null;

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/readings/${selectedMac}/latest`,
      { cache: "no-store" },
    )
      .then((res) => res.json())
      .then((data) => setSensorData(data));
  }, [selectedMac]);

  useEffect(() => {
    const from = new Date(Date.now() - 65 * 60 * 1000).toISOString();
    const to = new Date(Date.now() - 55 * 60 * 1000).toISOString();

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/readings/${selectedMac}?from=${from}&to=${to}`,
      { cache: "no-store" },
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.readings?.length) return;
        const oneHourAgo = Date.now() - 60 * 60 * 1000;
        const closest = data.readings.reduce((prev, curr) => {
          const prevDiff = Math.abs(new Date(prev.created_at) - oneHourAgo);
          const currDiff = Math.abs(new Date(curr.created_at) - oneHourAgo);
          return currDiff < prevDiff ? curr : prev;
        });
        setOneHrSensorData(closest);
        console.log(closest);
      });
  }, [selectedMac]);

  useEffect(() => {
    fetch(
      `https://weather.googleapis.com/v1/currentConditions:lookup?key=${process.env.NEXT_PUBLIC_GOOGLE_WEATHER_API}&location.latitude=${process.env.NEXT_PUBLIC_LATITUDE}&location.longitude=${process.env.NEXT_PUBLIC_LONGITUDE}`,
    )
      .then((res) => res.json())
      .then((data) => setWeatherData(data));
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex flex-col pb-8">
            <h1 className="font-bold text-5xl antialiased font-headline pb-1">
              Climate
            </h1>
            {sensorData && (
              <label className="text-[#94A3B9] text-sm font-label tracking-tight">
                LAST UPDATED:{" "}
                {new Date(sensorData.created_at).toLocaleString("en-AU", {
                  timeZone: "Australia/Melbourne",
                })}
              </label>
            )}
          </div>

          <SubNav
            devices={devices}
            selected={selectedMac}
            onSelect={setSelectedMac}
          />
        </div>
        {weatherData && (
          <Card className="w-60 h-39 p-3 bg-[#121B2F] justify-center items-center">
            <CardTitle>Outside</CardTitle>

            <div className="gap-18 flex ">
              <div>
                <label className="text-[#94A3B9] font-label font-semibold text-[10px] tracking-tight">
                  TEMPERATURE
                </label>
                <div className="flex">
                  <p className="text-2xl">
                    {weatherData.temperature.degrees}{" "}
                    <span className="text-sm text-[#94A3B9]">°C</span>
                  </p>
                </div>
              </div>
              <div>
                <label className="text-[#94A3B9] font-label font-semibold text-[10px] tracking-tight">
                  HUMIDITY
                </label>
                <p className="text-2xl">{weatherData.relativeHumidity}%</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {sensorData && (
        <div className="flex gap-6 w-full ">
          <Card className="flex-1 min-w-64 min-h-72 ">
            <CardTitle
              label="AMBIENT TEMPERATURE"
              icon={<Thermometer size={30} />}
            >
              Thermal Balance
            </CardTitle>
            <CardBody className="flex justify-center items-center flex-1 flex-col">
              <p className="text-6xl flex gap-2">
                {sensorData.temperature}
                <div className="flex flex-col-reverse">
                  <span className="text-2xl text-[#94A3B9]">°C</span>
                  {(() => {
                    if (sensorData && oneHrSensorData) {
                      const diff =
                        sensorData.temperature - oneHrSensorData.temperature;
                      return (
                        <span
                          className={`text-sm ${diff < 0 ? "text-(--color-accent)" : "text-red-400"}`}
                        >
                          {diff.toFixed(2)}
                        </span>
                      );
                    }
                  })()}
                </div>
              </p>
            </CardBody>
            <ProgressBar
              value={sensorData.temperature}
              max={weatherData ? weatherData.temperature.degrees * 2 : 30}
              marker={weatherData?.temperature.degrees}
            />
          </Card>

          <Card className="flex-1 min-w-64 min-h-72">
            <CardTitle label="RELATIVE HUMIDITY" icon={<Droplet />}>
              Moisture Content
            </CardTitle>
            <CardBody className="flex justify-center items-center flex-1 flex-col">
              <p className="text-6xl flex gap-2">
                {sensorData.humidity}
                <div className="flex flex-col-reverse">
                  <span className="text-2xl text-[#94A3B9]"> %</span>

                  {(() => {
                    if (sensorData && oneHrSensorData) {
                      const diff =
                        sensorData.humidity - oneHrSensorData.humidity;
                      return (
                        <span
                          className={`text-sm ${diff < 0 ? "text-(--color-accent)" : "text-red-400"}`}
                        >
                          {diff.toFixed(2)}
                        </span>
                      );
                    }
                  })()}
                </div>
              </p>
            </CardBody>
            <ProgressBar
              color="var(--color-accent)"
              value={sensorData.humidity}
              max={100}
            />
          </Card>

          <Card className="flex-1 min-w-64 min-h-72">
            <CardTitle label="CARBON DIOXIDE" icon={<p>CO₂</p>}>
              Air Quality
            </CardTitle>
            <CardBody className="flex justify-center items-center flex-1 flex-col">
              <p className="text-6xl">
                {sensorData.co2 ? (
                  <>
                    {sensorData.co2}
                    <span className="text-2xl text-[#94A3B9]"> PPM</span>
                  </>
                ) : (
                  "N/A"
                )}
              </p>
            </CardBody>
            <ProgressBar color="" value={sensorData.humidity} max={1000} />
          </Card>
        </div>
      )}
      <Card className="flex w-full"></Card>
    </div>
  );
}
