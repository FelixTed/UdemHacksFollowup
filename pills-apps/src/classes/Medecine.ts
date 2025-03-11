export class Medicine {
    medicineName: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    frequency: string;
    timeOfTheDay?: string;
    disclaimer?: string;
  
    constructor(
      medicineName: string,
      startDate: Date,
      frequency: string,
      description?: string,
      endDate?: Date,
      timeOfTheDay?: string,
      disclaimer?: string
    ) {
      this.medicineName = medicineName;
      this.startDate = startDate;
      this.frequency = frequency;
      this.description = description;
      this.endDate = endDate;
      this.timeOfTheDay = timeOfTheDay;
      this.disclaimer = disclaimer;
    }
  }