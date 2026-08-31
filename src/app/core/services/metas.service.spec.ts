import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MetasService } from './metas.service';

describe('MetasService', () => {
  let service: MetasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MetasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
