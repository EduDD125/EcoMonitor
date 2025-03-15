import { UUID } from "crypto";
import { idStrategy } from "../../utils/idStrategy";

export class Reading {
  private id: UUID;
  private location: string;
  private dateTime: Date;
  private measurementType: string;
  private value: string;

  constructor(location: string, measurementType: string, value: string, id?: UUID) {
    this.id = id ?? idStrategy(); 
    this.location = location;
    this.dateTime = new Date();
    this.measurementType = measurementType;
    this.value = value;
  }

  getId(): UUID {
    return this.id;
  }

  getLocation(): string {
    return this.location;
  }

  setLocation(location: string): void {
    this.location = location;
  }

  getDateTime(): Date {
    return this.dateTime;
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
    return `Reading ID: ${this.getId()} | Location: ${this.getLocation()} |
    DateTime: ${this.getDateTime()} | MeasurementType: ${this.getMeasurementType()} |
    Value: ${this.getValue()}`;
  }
}
