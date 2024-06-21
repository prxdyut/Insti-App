type Error_= {
  message: string;
  error: "auth";
}

type Success_<result> = {
  message: string;
  success: "auth";
  res: result;
}

type ActionRes<result>= {
  error: boolean;
  res?: result;
  message?: string;
  redirect?: string;
}

type ApiRes<result>= {
  error: boolean;
  res?: result;
  message?: string;
}

type ApiResponse = {
  error?: Error_;
  result?: any;
}
