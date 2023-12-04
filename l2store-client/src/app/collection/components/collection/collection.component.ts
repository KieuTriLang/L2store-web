import { Title } from '@angular/platform-browser';
import { CollectionFilter } from './../../models/collection-filter';
import { CollectionService } from './../../services/collection.service';
import { CollectionOverview } from './../../models/collection-overview';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  searchText: string = '';

  loading = false;

  page = 1;
  totalPage = 0;
  collections: CollectionOverview[] = [];
  collectionFilter: CollectionFilter = {
    name: '',
    priceStart: 0,
    priceEnd: 0,
  };
  constructor(
    private collectionService: CollectionService,
    private titleService: Title
  ) {
    this.titleService.setTitle('L2 | Collections');
  }

  ngOnInit(): void {
    this.getCollection(this.page);
  }

  onSearchTextEntered(searchText: string) {
    this.searchText = searchText;
    this.collectionFilter.name = this.searchText;
  }

  getCollection(page: number) {
    const params = new HttpParams().set('page', page);
    this.loading = true;
    this.collectionService.getAll(params).subscribe({
      next: (res) => {
        this.collections = [...this.collections, ...res.content];
        this.totalPage = res.totalPages;
        this.page++;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCollectionWithFilter(page: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('filter', JSON.stringify(this.collectionFilter));
    this.loading = true;
    this.collectionService.getAll(params).subscribe({
      next: (res) => {
        this.collections = [...this.collections, ...res.content];
        this.totalPage = res.totalPages;
        this.page++;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  handleScroll(e: any) {
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;

    if (this.loading == false && this.page <= this.totalPage) {
      if (scrollHeight - (scrollTop + clientHeight) < 150) {
        if (this.filterIsEmpty()) {
          this.getCollection(this.page);
        } else {
          this.getCollectionWithFilter(this.page);
        }
      }
    }
  }

  filterIsEmpty(): boolean {
    if (
      this.collectionFilter.name == '' &&
      this.collectionFilter.priceStart == 0 &&
      this.collectionFilter.priceEnd == 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleSubmitSearch(value: any) {
    if (value) {
      this.page = 1;
      this.collections = [];
      if (this.filterIsEmpty()) {
        this.getCollection(this.page);
      } else {
        this.getCollectionWithFilter(this.page);
      }
    }
  }
}
