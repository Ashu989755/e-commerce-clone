import SecureLS from "secure-ls";

const ls = new SecureLS();
export const chatToken = ls.get("token");


export const createSignalRConnection = () => {
    const token = chatToken.replace(/^Bearer\s/, "");
    const connection = new HubConnectionBuilder()
      .withUrl("https://api.our-review.com/chat", {
        accessTokenFactory: () => token,
        transport: HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .configureLogging(LogLevel.Information)
      .build();
  
    return connection;
  };
  