import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteduserComponent } from './reporteduser.component';

describe('ReporteduserComponent', () => {
    let component: ReporteduserComponent;
    let fixture: ComponentFixture<ReporteduserComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReporteduserComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReporteduserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it("should sort", () => {
    //     let sortedList = component.sortByName([{naam: "peter"}, {naam: "AP"}, {naam: "Robbin"}]);
    //     expect(sortedList[0].naam == "AP").toBeTrue();
    // });

    // it("should sort reverse", () => {
    //     let sortedList = component.sortByName([{naam: "peter"}, {naam: "AP"}, {naam: "Robbin"}]);
    //     sortedList = component.sortByName([{naam: "peter"}, {naam: "AP"}, {naam: "Robbin"}]);
    //     expect(sortedList[0].naam == "Robbin").toBeTrue();
    // });

    // it("should sort by reason", () => {
    //     let sortedList = component.sortByReason([{reason: "peter"}, {reason: "AP"}, {reason: "Robbin"}]);
    //     expect(sortedList[0].reason == "AP").toBeTrue();
    // });

    // it("should sort by reason reverse", () => {
    //     let sortedList = component.sortByReason([{reason: "peter"}, {reason: "AP"}, {reason: "Robbin"}]);
    //     sortedList = component.sortByReason(sortedList);
    //     expect(sortedList[0].reason == "Robbin").toBeTruthy();
    // });

    // it("should sort by reason reverse and name", () => {
    //     let sortedList = component.sortByReason([{naam: "Sjaak Willem", reason: "peter"}, {naam: "Jan Peter", reason: "AP"},
    //     {naam: "Henk Pieter Bartel Jaap", reason: "Robbin"}]);
    //     sortedList = component.sortByName(sortedList);
    //     expect(sortedList[0].naam == "Henk Pieter Bartel Jaap").toBeTruthy();
    // });

    // it("should sort by date", () => {
    //     let sortedList = component.sortByDate([{ date: new Date("December 30, 2017 11:20:25"), naam: 'Justin', reason: 'd' },
    //     { date: new Date("December 30, 2018 11:20:25"), naam: 'Anne Pier', reason: 'a' },
    //     { date: new Date("December 30, 2019 11:20:25"), naam: 'Merel', reason: 'b' },]);
    //     sortedList = component.sortByDate(sortedList);
    //     expect(sortedList[0].date == "Mon Dec 30 2019 11:20:25 GMT+0100 (Central European Standard Time)").toBeTrue();
    // });

    // it("should sort by all", () => {
    //     let sortedList = component.sortByDate([{ date: new Date("December 30, 2017 11:20:25"), naam: 'Justin', reason: 'd' },
    //     { date: new Date("December 30, 2018 11:20:25"), naam: 'Anne Pier', reason: 'a' },
    //     { date: new Date("December 30, 2019 11:20:25"), naam: 'Merel', reason: 'b' },]);
    //     sortedList = component.sortByDate(sortedList);
    //     sortedList = component.sortByReason(sortedList);
    //     sortedList = component.sortByReason(sortedList);
    //     sortedList = component.sortByReason(sortedList);
    //     sortedList = component.sortByDate(sortedList);
    //     sortedList = component.sortByName(sortedList);
    //     sortedList = component.sortByName(sortedList);
    //     sortedList = component.sortByName(sortedList);
    //     sortedList = component.sortByDate(sortedList);
    //     expect(sortedList[0].date == "Sat Dec 30 2017 11:20:25 GMT+0100 (Central European Standard Time)").toBeTrue();
    // });
});
