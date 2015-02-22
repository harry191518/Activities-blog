#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    char categories[25], num[25], title[30], s[100];
    FILE *fp1, *fp2;

    fp1 = fopen("/Users/RLai/Node/first/new.md", "r");

    fgets(categories, 25, fp1);
    fgets(num, 25, fp1);
    fgets(title, 30, fp1);

    if(categories[0] != num[0])
        return 0;

    switch (categories[0]) {
        case 'a':
            strcpy(categories, "SendLove");
            break;
        case 'b':
            strcpy(categories, "Party");
            break;
        case 'c':
            strcpy(categories, "Picnic");
            break;
        case 'd':
            strcpy(categories, "Concert");
            break;
        case 'e':
            strcpy(categories, "ByeMeal");
            break;
        case 'f':
            strcpy(categories, "CKCup");
            break;
    }
    num[strlen(num)-1] = '\0';

    char path[100] = "/Users/RLai/Node/test/source/_posts/";
    strcat(path, num);
    strcat(path, ".md");
    fp2 = fopen(path, "w");

    fprintf(fp2, "categories: %s\n", categories);
    fprintf(fp2, "---\n\n##");
    fprintf(fp2, "%s", title);

    while(!feof(fp1))
    {
        fgets(s, 100, fp1);
        if(feof(fp1)) break;
        if(strcmp(s, "%---%\n") == 0)
        {
            fgets(s, 100, fp1);
            s[strlen(s)-1] = '\0';
            fprintf(fp2, "\n![](/picture/%s)", s);
        }
        else
            fprintf(fp2, "%s", s);
    }
    /*while(!feof(fp1))
    {
        fgets(s, 100, fp1);
        if(feof(fp1)) break;
        printf("%s", s);
    }*/

    return 0;
}
