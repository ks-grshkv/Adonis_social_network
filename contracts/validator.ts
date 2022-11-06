declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
      password_correct(email: string): Rule
    }
  }
  