export type credentials = {
  email:String;
  password:String
}
//could include data or input
export type userData ={
  email: string; 
  username: string;
  password: string
}


export type fullUserData = {
  email: string;
  username: String;
  password: String;
  profile_picture: String;
  owned_routes: string[]; 
  saved_routes: string[];
}