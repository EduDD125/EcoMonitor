import { idStrategy } from "../../utils/idStrategy";

export class Reading {
  private id: string;
  private location: string;
  private dateTime: string;
  private measurementType: string;
  private value: string;

  constructor(location: string, dateTime: string, measurementType: string, value: string, id?: string) {
    this.id = id ?? idStrategy(); 
    this.location = location;
    this.dateTime = dateTime;
    this.measurementType = measurementType;
    this.value = value;
  }

  getId(): string {
    return this.id;
  }

  getLocation(): string {
    return this.location;
  }

  setLocation(location: string): void {
    this.location = location;
  }

  getDateTime(): string {
    return this.dateTime;
  }

  setDateTime(dateTime: string): void {
    this.dateTime = dateTime;
  }

  getMeasurementType(): string {
    return this.measurementType;
  }

  setMeasurementType(measurementType: string): void {
    this.measurementType = measurementType;
  }

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
  }

  toString(): string {
    return `reading ID: ${this.getId} | location: ${this.getLocation} | dateTime: ${this.getDateTime} | measurementType: ${this.getMeasurementType} | value: ${this.getValue}`;
  }
}
