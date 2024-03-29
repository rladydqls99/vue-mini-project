import axios from "axios";

export default {
  methods: {
    async $api(url, data) {
      return (
        await axios({
          methods: "post",
          url,
          data,
        }).catch((e) => {
          console.log(e);
        })
      ).data;
    },

    $base64(flie) {
      return new Promise((resolve) => {
        let a = new FileReader();
        a.onload = (e) => resolve(e.target.result);
        a.readAsDataURL(file);
      });
    },

    $currencyFormat(value, format = "#,###") {
      if (value === 0 || value === null) return 0;

      let currency = format.substring(0, 1);
      if (currency === "$" || currency === "￦") {
        format = format.substring(1, format.length);
      } else {
        currency = "";
      }

      let groupingSeparator = ",";
      let maxFractionDigits = 0;
      let decimalSeparator = ".";

      if (format.indexOf(".") === -1) {
        groupingSeparator = ",";
      } else {
        if (format.indexOf(",") < format.indexOf(".")) {
          groupingSeparator = ",";
          decimalSeparator = ".";
          maxFractionDigits = format.length - format.indexOf(".") - 1;
        } else {
          groupingSeparator = ".";
          decimalSeparator = ",";
          maxFractionDigits = format.length - format.indexOf(",") - 1;
        }
      }

      let prefix = "";
      let d = "";
      let dec = 1;
      for (let i = 0; i < maxFractionDigits; i++) {
        dec *= 10;
      }

      let v = String(Math.round(parseFloat(value) * dec) / dec);

      if (v.indexOf("-") > -1) {
        prefix = "-";
        v = v.substring(1);
      }

      if (
        maxFractionDigits > 0 &&
        format.substring(format.length - 1, format.length) === "0"
      ) {
        v = String(parseFloat(v).toFixed(maxFractionDigits));
      }

      if (maxFractionDigits > 0 && v.indexOf(".") > -1) {
        d = v.substring(v.indexOf("."));
        d = d.replace(".", decimalSeparator);
        v = v.substring(0, v.indexOf("."));
      }

      let regExp = /\D/g;
      v = v.replace(regExp, "");
      let r = /(\d+)(\d{3})/;

      while (r.test(v)) {
        v = v.replace(r, "$1" + groupingSeparator + "$2");
      }

      return prefix + currency + String(v) + String(d);
    },
  },
};
