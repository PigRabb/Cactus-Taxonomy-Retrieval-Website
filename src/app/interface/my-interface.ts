export interface Test {
    Name: string;
    Score: number;
    image_url: string;
  }
  
  export interface FtList {
    Name: string;
    Value: number;
    Url: string;
  }
  
  export interface DataFT {
    Name: string;
    FtNo: number;
    group: string;
    FtList: FtList[];
  }
  
  export interface DataOfFT {
    DataFT: DataFT[];
  }
  
  
export interface CactusPredict {
    columns: string[];
    data: number[][];
  }

export interface UserData {
    Code: string;
    Email: string;
    Name: string;
    Surname: string;
    Role: string;
    Uid: string;
    Status: number;
  }

export interface saveData{
  Status : number
}


export interface Predict {
  Transaction_id: number;
  Member_code: number;
  Feature: string[];
  Result: string;
  Timestamp: string;
  DataStatus: string;
}

export interface StatusServer {
  Name: string;
  Status: number;
}




export interface StatusServerList {
  status_server: StatusServer[];
}


export interface predictData {
  predict: Predict[];
}


export interface Image {
  Name: string;
}

export interface Cactu {
  Name: string;
  Image: Image[];
  Dedescriptions: string;
}

export interface CacTusData {
  Cactus: Cactu[];
}

export interface Status {
  status: number;
}


export interface ModelAccuracy {
  Accuracy: number;
}


export interface User {
  Code: number;
  Email: string;
  Password: string;
  Name: string;
  Surname: string;
  Role: string;
  Uid: string;
  isLogin: number;
  EmV: number;
}

export interface UserQall {
  user: User[];
}

export interface CountDataStatu {
  DataStatus: string;
  count_datastatus: number;
}

export interface CountDataStatus {
  countDataStatus: CountDataStatu[];
}


  export interface CountCactusName {
      Result: string;
      count_result: number;
  }

  export interface CountCactusNameList {
      countCactusName: CountCactusName[];
  }

   export interface CountUserData {
        EmV: number;
        count_countUserData: number;
    }

    export interface CountUserDataList {
        countUserData: CountUserData[];
    }







