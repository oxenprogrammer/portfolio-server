export class AbstractPaginationDTO {
  data: any[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}
