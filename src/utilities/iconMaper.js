export default {
  getIconString: name => {
    switch (name) {
      case "explicit":
        return "supervisor_account";
        break;
      case "dev":
        return "gavel";
        break;
      case "movie":
        return "movie";
        break;
      case "food":
        return "restaurant";
        break;
      case "celebrity":
        return "face";
        break;
      case "science":
        return "developer_board";
        break;
      case "sport":
        return "directions_bike";
        break;
      case "political":
        return "account_balance";
        break;
      case "religion":
        return "remove_red_eye";
        break;
      case "animal":
        return "pets";
        break;
      case "history":
        return "receipt";
        break;
      case "music":
        return "music_note";
        break;
      case "travel":
        return "airplanemode_active";
        break;
      case "career":
        return "trending_up";
        break;
      case "money":
        return "attach_money";
        break;
      case "fashion":
        return "wc";
        break;

      default:
        break;
    }
  }
};
