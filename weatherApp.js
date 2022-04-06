export const weatherApp = {
    apiKey: "c1cc53b5ba214351bc9232844221703",
    //Query Selectors
    loadingOrErrorModal: document.querySelector(".modal-overlay"),
    searchModal: document.querySelector(".location-search"),
    searchButton: document.querySelector(".search-btn"),
    loadingIcon: document.querySelector(".preloader"),
    changeLocation: document.querySelector(".location-change-click"),
    allowLocationText: document.querySelector(".allow-location-text"),
    warningIcon: document.querySelector(".warning"),
    emptyQueryError: document.querySelector(".error-message-for-search"),
    internetProblemText: document.querySelector(".internet-problem-text"),
    loc: document.querySelector(".location"),
    forecastDay: document.querySelector(".forecast-day"),
    showSunIcon: document.querySelector(".sun"),
    showMoonIcon: document.querySelector(".moon"),
    optionTempUnit: document.querySelector(".option-unit"),
    currentTempUnit: document.querySelector(".current-unit"),
    temp: document.querySelector(".temp-big-text"),
    temp_f: undefined,
    temp_c: undefined,
    chanceOfRain: document.querySelector(".chance-of-rain"),
    sunrise: document.querySelector(".sunrise"),
    sunset: document.querySelector(".sunset"),
    moonrise: document.querySelector(".moonrise"),
    moonset: document.querySelector(".moonset"),
    precipitation: document.querySelector(".precipitation"),
    humidity: document.querySelector(".humidity"),
    wind: document.querySelector(".wind-speed"),
    condition: document.querySelector(".condition"),
    background: document.querySelector(".forecast-day"),
    previousBackground: undefined,
    updated: document.querySelector(".last-updated"),
    lastupdated: "",
    reload: document.querySelector(".reload"),
    closeButton: document.querySelector(".close-btn "),
    useCurrentLocation: document.querySelector(".use-current-location"),
    icon: document.querySelector(".icon"),

    //Backgrounds
    backgrounds: {
      clearDayNight: {
        test: 1,
        regex: [/clear/i, /sunny/i],
        cssClassToToggle: [
          [
            "forecast-background-to-clear-night",
            "./images/32/white/32/Color=Off-for-1.svg",
          ],
          [
            "forecast-background-to-clear-sky",
            "./images/icons/weather/64x64/day/113.png",
          ],
        ],
      },
      partiallycloudyDayNight: {
        test: 2,
        regex: [/^partly cloudy/i],
        cssClassToToggle: [
          [
            "forecast-background-to-partially-cloudy-night",
            "./images/32/white/32/Color=Off-for-5.svg",
          ],
          [
            "forecast-background-to-partially-cloudy-day",
            "./images/32/white/32/Color=Off-for-3.svg",
          ],
        ],
      },
      cloudyDayNight: {
        test: 3,
        regex: [/^cloudy/i, /overcast/i],
        cssClassToToggle: [
          [
            "forecast-background-to-heavy-clouds-night",
            "./images/32/white/32/Color=Off-for-6.svg",
          ],
          [
            "forecast-background-to-heavy-clouds-day",
            "./images/32/white/32/Color=Off-for-4.svg",
          ],
        ],
      },

      drizzleDayNight: {
        test: 4,
        regex: [/drizzle/i],
        cssClassToToggle: [
          [
            "forecast-background-to-heavy-clouds-night",
            "./images/32/white/32/Color=Off-for-8.svg",
          ],
          [
            "forecast-background-to-heavy-clouds-day",
            "./images/32/white/32/Color=Off-for-8.svg",
          ],
        ],
      },
      rainyDayNight: {
        test: 5,
        regex: [/^[patchy,light,moderate,torrential,thundery].+\srain/i],
        cssClassToToggle: [
          [
            "forecast-background-to-heavy-clouds-night",
            "./images/32/white/32/Color=Off-for-6.svg",
          ],
          [
            "forecast-background-to-heavy-clouds-day",
            "./images/32/white/32/Color=Off-for-4.svg",
          ],
        ],
      },

      heavyRainDayNight: {
        test: 6,
        regex: [/[outbreaks,heavy].+(rain,possible)/i],

        cssClassToToggle: [
          [
            "forecast-background-to-heavy-clouds-night",
            "./images/32/white/32/Color=Off-for-9.svg",
          ],
          [
            "forecast-background-to-heavy-clouds-day",
            "./images/32/white/32/Color=Off-for-9.svg",
          ],
        ],
      },
      sleetDayNight: {
        test: 7,
        regex: [/sleet/i],
        cssClassToToggle: [
          [
            "forecast-background-to-heavy-clouds-night",
            "./images/32/white/32/Color=Off-for-22.svg",
          ],
          [
            "forecast-background-to-heavy-clouds-day",
            "./images/32/white/32/Color=Off-for-22.svg",
          ],
        ],
      },

      blizzardDayNight: {
        test: 8,
        regex: [/blizard/i, /blowing/i],
        cssClassToToggle: [
          [
            "forecast-background-to-snow-night",
            "./images/32/white/32/Color=Off-for-25",
          ],
          [
            "forecast-background-to-snow-day",
            "./images/32/white/32/Color=Off-for-25",
          ],
        ],
      },

      snowDayNight: {
        test: 9,
        regex: [/snow/i],
        cssClassToToggle: [
          [
            "forecast-background-to-snow-night",
            "./images/32/white/32/Color=Off-for-23",
          ],
          [
            "forecast-background-to-snow-day",
            "./images/32/white/32/Color=Off-for-23",
          ],
        ],
      },

      MistDayNight: {
        test: 10,
        regex: [/ice/i, /mist/i, /fog/i],
        cssClassToToggle: [
          [
            "forecast-background-to-mist-fog-night",
            "./images/32/white/32/Color=Off-for-7",
          ],
          [
            "forecast-background-to-mist-fog-day",
            "./images/32/white/32/Color=Off-for-7",
          ],
        ],
      },
    },

    //Methods
    toggleBackgroundAndIcon(day, conditiontext) {
      this.toggleDayNight(day);
      for (let i in this.backgrounds) {
        for (let j in this.backgrounds[i].regex) {
          if (this.backgrounds[i].regex[j].test(conditiontext)) {
            console.log(this.backgrounds[i].test);
            console.log(this.previousBackground);
            if (this.previousBackground) {
              console.log("Previous background");
              this.background.classList.remove(this.previousBackground);
              this.previousBackground =
                this.backgrounds[i].cssClassToToggle[day][0];
            }
            if (this.previousBackground == undefined) {
              this.previousBackground =
                this.backgrounds[i].cssClassToToggle[day][0];
            }
            this.background.classList.add(
              this.backgrounds[i].cssClassToToggle[day][0]
            );

            this.icon.src = this.backgrounds[i].cssClassToToggle[day][1];
          }
        }
      }
    },

    getConditionText(object) {
      return `${object.current.condition.text}`;
    },

    changeToDay() {
      this.showSunIcon.classList.remove("hide-day-night-icon");
      this.showMoonIcon.classList.add("hide-day-night-icon");
    },

    changeToNight() {
      this.showSunIcon.classList.add("hide-day-night-icon");
      this.showMoonIcon.classList.remove("hide-day-night-icon");
    },

    changeTempUnit() {
      if (this.optionTempUnit.textContent == "F") {
        this.temp.textContent = this.temp_f;
      }
      if (this.optionTempUnit.textContent == "C") {
        this.temp.textContent = this.temp_c;
      }
      [this.optionTempUnit.textContent, this.currentTempUnit.textContent] = [
        this.currentTempUnit.textContent,
        this.optionTempUnit.textContent,
      ];
    },

    toggleDayNight(value) {
      if (value) {
        this.changeToDay();
      } else {
        this.changeToNight();
      }
    },

    lastUpdated() {
      const times = [
        "just now",
        "a few minutes ago",
        "30 mins ago",
        "an hour ago",
        "over an hour ago",
        "a long time ago",
      ];

      this.updated.textContent = times[0];
      //5 mins later
      setTimeout(() => {
        this.lastupdated = times[1];
        this.updated.textContent = this.lastupdated;
      }, 300000);

      //30 mins later
      setTimeout(() => {
        this.lastupdated = times[2];
        this.updated.textContent = this.lastupdated;
      }, 1.8e6);

      //an hour later
      setTimeout(() => {
        this.lastupdated = times[3];
        this.updated.textContent = this.lastupdated;
      }, 3.6e6);

      //over an hour
      setTimeout(() => {
        this.lastupdated = times[4];
        this.updated.textContent = this.lastupdated;
      }, 5.4e6);

      //a long time
      setTimeout(() => {
        this.lastupdated = times[5];
        this.updated.textContent = this.lastupdated;
      }, 5.7e6);
    },

    addRemoveClass(classString, comp, duration) {
      comp.classList.add(classString);
      setTimeout(() => {
        comp.classList.remove(classString);
      }, duration);
    },

    showInternetError() {
      this.loadingIcon.classList.add("hide");
      this.allowLocationText.classList.add("hide");
      this.warningIcon.classList.remove("hide");
      this.internetProblemText.classList.remove("hide");
    },

    closeModal(type) {
      type.classList.add("hide");
    },

    openModal(type) {
      type.classList.remove("hide");
    },

    getData(object) {
      let conditiontext = weatherApp.getConditionText(object);
      let isDay =
        object.forecast.forecastday[0].hour[
          Number(String(object.location.localtime).match(/\s\d+/))
        ].is_day;
      this.loc.textContent = `${object.location.name},  ${object.location.region} - ${object.location.country}`;
      this.temp.textContent = `${object.current.temp_c}`;
      this.precipitation.textContent = `${object.current.precip_in} in`;
      this.humidity.textContent = `${object.current.humidity} %`;
      this.wind.textContent = `${object.current.wind_mph} mph`;
      this.chanceOfRain.textContent = `${object.forecast.forecastday[0].day.daily_chance_of_rain}%`;
      this.condition.textContent = `${object.current.condition.text}`;
      this.sunrise.textContent = `${object.forecast.forecastday[0].astro.sunrise}`;
      this.sunset.textContent = `${object.forecast.forecastday[0].astro.sunset}`;
      this.moonrise.textContent = `${object.forecast.forecastday[0].astro.moonrise}`;
      this.moonset.textContent = `${object.forecast.forecastday[0].astro.moonset}`;
      this.temp_c = `${object.current.temp_c}`;
      this.temp_f = `${object.current.temp_f}`;
      this.lastUpdated();
      this.toggleBackgroundAndIcon(isDay, conditiontext);
    },

    formatQuery(input) {
      if (typeof input == "string") {
        return input;
      }
      if (typeof input == "object") {
        return `${input[0]},${input[1]}`;
      }
    },
    request(callback, dataDump) {
      const requestUrl = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${callback}&days=1&aqi=no&alerts=no`;
      fetch(requestUrl)

        .catch(error => {
          this.showInternetError();
          return Promise.reject()
        })

        .then((response) => {
          if (!response.ok) {
            this.showInternetError();
          } else {
            return response.json();
          }
        })

        .then((data) => {
          dataDump = data;
          this.getData(dataDump);
          setTimeout(() => {
            this.closeModal(this.loadingOrErrorModal);
          }, 10000);
        });
    },
  };

