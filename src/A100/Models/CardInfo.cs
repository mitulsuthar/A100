namespace A100.Models
{
    public class CardInfo {
        public string NameOnCard {get;set;}
        public string CardNumber {get;set;}
        public string CardType {get;set;}
        public ExpirationDate ExpirationDate {get;set;}
        public string SecurityCode {get;set;}
    }    

    public class ExpirationDate {
        public string ExpirationMonth {get;set;}
        public string ExpirationYear {get;set;}
    }
}