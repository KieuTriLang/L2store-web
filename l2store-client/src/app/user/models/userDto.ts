export class UserDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public gender: boolean | undefined,
    public avatar: string,
    public address: string,
    public dob: string,
    public roles: any[]
  ) {}
}
