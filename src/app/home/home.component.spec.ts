import { TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";

describe('Component: Home', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent]
        });
    })

    it('should create the app', (() => {
        let fixture = TestBed.createComponent(HomeComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});